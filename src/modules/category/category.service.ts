import { Category } from './category.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HttpException, HttpStatus } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category)
    private readonly categoryModel: typeof Category,
  ) {}

  async getList() {
    const list = await this.categoryModel.findAll();
    return { list };
  }

  async create({ name, description }) {
    const existedCategory = await this.categoryModel.findOne({
      where: { name },
    });

    if (existedCategory) {
      throw new HttpException(
        `category: '${existedCategory.name}' is existed`,
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.categoryModel.create({ name, description });
  }
}
