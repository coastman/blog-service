import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { CategoryDTO } from './category.dto';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async getCategories() {
    return await this.categoryService.getList();
  }

  @Post()
  async createCategory(@Body() body: CategoryDTO) {
    return await this.categoryService.create(body);
  }

  @Put()
  async updateCategory() {}

  @Delete()
  async deleteCategory() {}
}
