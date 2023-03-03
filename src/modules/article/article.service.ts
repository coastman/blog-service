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
}
