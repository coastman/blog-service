import { Tag } from './tag.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag)
    private readonly tagModel: typeof Tag,
  ) {}

  async findList(query) {
    const list =
      (await this.tagModel.findAll({
        offset: (query.pageNum - 1) * query.pageSize,
        limit: parseInt(query.pageSize),
        order: [['updatedAt', 'DESC']],
      })) || [];

    const total = await this.tagModel.count();

    return {
      list,
      total,
    };
  }
}
