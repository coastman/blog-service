import { Tag } from './tag.model';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class TagService {
  constructor(
    @InjectModel(Tag)
    private readonly tagModel: typeof Tag,
  ) {}

  async findAll() {
    const list = await this.tagModel.findAll();
    return list;
  }

  async findList(query) {
    const list =
      (await this.tagModel.findAll({
        offset: (query.page - 1) * query.pageSize,
        limit: parseInt(query.pageSize),
        order: [['updatedAt', 'DESC']],
      })) || [];

    const total = await this.tagModel.count();

    return {
      list,
      total,
    };
  }

  async create({ name, description = '' }) {
    const existedTag = await this.tagModel.findOne({ where: { name } });

    if (existedTag) {
      throw new HttpException('this tag is existed', HttpStatus.BAD_REQUEST);
    }

    const result = await this.tagModel.create({ name, description });

    return { result };
  }

  async updateById(id, updateTag) {
    const tag = await this.tagModel.findByPk(id);

    if (!tag) {
      throw new HttpException(
        'this tag is not existed',
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.tagModel.update(updateTag, { where: { id } });

    return {
      result: id,
    };
  }

  async deleteById(id) {
    const tag = await this.tagModel.findByPk(id);

    if (tag) return tag.destroy();

    throw new HttpException('this tag is not existed', HttpStatus.BAD_REQUEST);
  }

  async findAllAndCount() {
    const count = await this.tagModel.count();
    const list = await this.tagModel.findAll();
    return {
      list,
      count,
    };
  }
}
