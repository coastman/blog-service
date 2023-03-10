import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async list(@Query() query: object) {
    return this.articleService.findPage(query);
  }

  @Post()
  async create(@Body() body: any) {
    return await this.articleService.create(body);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.articleService.deleteById(id);
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return await this.articleService.findById(id);
  }
}
