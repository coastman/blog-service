import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op, fn, col } from 'sequelize';
import { Article } from './article.model';
import { Cache } from 'cache-manager';
import { LikeService } from '../like/like.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article)
    private readonly articleModel: typeof Article,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly likeService: LikeService,
  ) {}

  async findPage(query) {
    let where = {};
    // find_in_set
    if (query.categotyId)
      where = fn('find_in_set', query.categotyId, col('category_id_list'));
    if (query.dateRange) {
      where = {
        createdAt: {
          [Op.between]: query.dateRange.map(
            (date: string) => new Date(Number(date)),
          ),
        },
      };
    }
    if (query.tagId) where = fn('find_in_set', query.tagId, col('tag_id_list'));
    let list =
      (await this.articleModel.findAll({
        offset: (query.page - 1) * query.pageSize,
        limit: parseInt(query.pageSize),
        order: [['createdAt', 'DESC']],
        where,
      })) || [];
    list = list.map((model) => model.get({ plain: true }));
    const total = await this.articleModel.count({ where });
    return {
      list,
      total,
    };
  }

  async create(body) {
    const result = await this.articleModel.create(body);
    return { result };
  }

  async deleteById(id) {
    const article = await this.articleModel.findByPk(id);

    if (article) return article.destroy();

    throw new HttpException(
      'this article is not existed',
      HttpStatus.BAD_REQUEST,
    );
  }

  async findById(id) {
    const article = (await this.articleModel.findByPk(id)).get({ plain: true });

    if (!article) {
      throw new HttpException(
        'this article is not existed',
        HttpStatus.BAD_REQUEST,
      );
    }

    const where = {
      id: {
        [Op.ne]: article.id,
      },
      [Op.or]: {
        categoryIdList: {
          [Op.in]: article.categoryIdList,
        },
        tagIdList: {
          [Op.in]: article.tagIdList,
        },
      },
    };

    const [prev, next, relatedList] = await Promise.all([
      (
        await this.articleModel.findOne({
          where: {
            id: {
              [Op.ne]: article.id,
            },
            createdAt: {
              [Op.gte]: article.createdAt,
            },
          },
          order: [['createdAt', 'ASC']],
          limit: 1,
        })
      )?.get({ plain: true }),
      (
        await this.articleModel.findOne({
          where: {
            id: {
              [Op.ne]: article.id,
            },
            createdAt: {
              [Op.lte]: article.createdAt,
            },
          },
          order: [['createdAt', 'DESC']],
          limit: 1,
        })
      )?.get({ plain: true }),
      (
        await this.articleModel.findAll({ where })
      )?.map((item) => item?.get({ plain: true })),
    ]);

    article.viewCount++;
    this.articleModel.update(
      { viewCount: article.viewCount },
      { where: { id } },
    );

    const views: number =
      (await this.cacheManager.get('blog:article:view-count')) || 0;

    this.cacheManager.set('blog:article:view-count', views + 1, 0);
    return {
      result: article,
      prevArticle: prev,
      nextArticle: next,
      relatedList,
    };
  }

  async updateById(data, id) {
    const article = await this.articleModel.findByPk(id);
    if (article) {
      await this.articleModel.update(data, {
        where: { id },
      });
      return { result: id };
    }
    throw new HttpException('article is not existed', HttpStatus.BAD_REQUEST);
  }

  async liking(params) {
    const resList = await Promise.all([
      this.articleModel.increment('likeCount', {
        where: { id: params.refId },
      }),
      this.likeService.liking(params),
    ]);
    return { result: resList[1] };
  }

  async hotList() {
    const list = (
      (await this.articleModel.findAll({
        offset: 0,
        limit: 10,
        order: [['commentCount', 'DESC']],
      })) || []
    ).map((model) => model.get({ plain: true }));

    const count = (await this.articleModel.count()) || 0;

    return {
      list,
      count,
    };
  }

  async activeDate() {
    const deteList = await this.articleModel.findAll({
      attributes: ['createdAt'],
    });

    return {
      deteList,
    };
  }
}
