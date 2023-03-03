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
  async createArticle(@Body() body: any) {
    return await this.articleService.create(body);
  }
}
