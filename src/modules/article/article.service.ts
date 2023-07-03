import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Article } from './article.model';
import { TagService } from '../tag/tag.service';
import { CategoryService } from '../category/category.service';
import { Cache } from 'cache-manager';
import { LikeService } from '../like/like.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article)
    private readonly articleModel: typeof Article,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly tagService: TagService,
    private readonly categoryService: CategoryService,
    private readonly likeService: LikeService,
  ) {}

  async findPage(query) {
    let list =
      (await this.articleModel.findAll({
        offset: (query.page - 1) * query.pageSize,
        limit: parseInt(query.pageSize),
        order: [['createdAt', 'DESC']],
        // raw: true,
      })) || [];
    list = list.map((model) => model.get({ plain: true }));
    // const tagList = (await this.tagService.findAll()).map((model) =>
    //   model.get({ plain: true }),
    // );
    // const categoryList =  (await this.categoryService.findAll()).map((model) =>
    // model.get({ plain: true }),
    // );
    // console.log(list);
    // list.forEach(item => {
    //   item.category = {
    //     categoryId: item.ca
    //   } 
    // });
    const total = await this.articleModel.count();
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

    article.viewCount++;
    this.articleModel.update(
      { viewCount: article.viewCount },
      { where: { id } },
    );

    const views: number =
      (await this.cacheManager.get('blog:article:view-count')) || 0;

    this.cacheManager.set('blog:article:view-count', views + 1, 0);

    return { result: article };
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
        limit: 16,
        order: [['commentCount', 'DESC']],
      })) || []
    ).map((model) => model.get({ plain: true }));

    const count = (await this.articleModel.count()) || 0;

    return {
      list,
      count,
    };
  }
}
