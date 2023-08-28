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
import { Public } from 'src/decorators/public.decorator';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Public()
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

  @Public()
  @Get(':id')
  async findById(@Param('id') id: number) {
    return await this.articleService.findById(id);
  }

  @Put(':id')
  async updateById(@Body() body: any, @Param('id') id: number) {
    return await this.articleService.updateById(body, id);
  }

  @Public()
  @Post('/like')
  async liking(@Body() body: any) {
    return await this.articleService.liking(body);
  }
}
