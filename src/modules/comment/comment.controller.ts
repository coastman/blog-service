import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async page(@Query() query: object) {
    return this.commentService.findPage(query);
  }

  @Get('/byArticle/:id')
  async findByArticleId(@Param('id') id: number) {
    return this.commentService.findByArticle(id);
  }

  @Post()
  async create(@Body() body: any) {
    return await this.commentService.create(body);
  }
}
