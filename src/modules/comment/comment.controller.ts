import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async page() {
    return this.commentService.findPage();
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
