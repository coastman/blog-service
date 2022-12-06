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
    const list = (await this.categoryModel.findAll()) || [];

    return { list, count: list.length };
  }

  async findById(id: number) {
    const result = await this.categoryModel.findByPk(id);

    return { result };
  }

  async updateById(id, updateCategory) {
    const category = await this.categoryModel.findByPk(id);

    if (category) {
      await this.categoryModel.update(updateCategory, {
        where: { id },
      });

      return { result: id };
    }

    throw new HttpException('category is not existed', HttpStatus.BAD_REQUEST);
  }

  async create({ name, description = '' }) {
    const existedCategory = await this.categoryModel.findOne({
      where: { name },
    });

    if (existedCategory) {
      throw new HttpException(
        `category: '${existedCategory.name}' is existed`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const result = await this.categoryModel.create({ name, description });

    return { result };
  }

  async deleteById(id) {
    const category = await this.categoryModel.findByPk(id);

    if (category) return category.destroy();

    throw new HttpException('category is not existed', HttpStatus.BAD_REQUEST);
  }
}
