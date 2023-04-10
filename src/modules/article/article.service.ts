import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Article } from './article.model';
import { TagService } from '../tag/tag.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article)
    private readonly articleModel: typeof Article,
    private readonly tagService: TagService,
    private readonly categoryService: CategoryService,
  ) {}

  async findPage(query) {
    const list =
      (await this.articleModel.findAll({
        offset: (query.page - 1) * query.pageSize,
        limit: parseInt(query.pageSize),
        order: [['updatedAt', 'DESC']],
        raw: true,
      })) || [];
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
    const article = await this.articleModel.findByPk(id);
    if (!article) {
      throw new HttpException(
        'this article is not existed',
        HttpStatus.BAD_REQUEST,
      );
    }

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
}
