import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Article } from './article.model';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(Article)
    private readonly articleModel: typeof Article,
  ) {}

  async findPage(query) {
    const list =
      (await this.articleModel.findAll({
        offset: (query.page - 1) * query.pageSize,
        limit: parseInt(query.pageSize),
        order: [['updatedAt', 'DESC']],
      })) || [];

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
