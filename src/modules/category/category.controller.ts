import {
  Controller,
  Delete,
  Param,
  Body,
  Post,
  Get,
  Put,
} from '@nestjs/common';
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

  @Get(':id')
  async getCategory(@Param('id') id: number) {
    return this.categoryService.findById(id);
  }

  @Put(':id')
  async updateCategory(@Param('id') id: number, @Body() category) {
    return this.categoryService.updateById(id, category);
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: number) {
    return this.categoryService.deleteById(id);
  }
}
