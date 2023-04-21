import { Controller, Get, Param } from '@nestjs/common';
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
}
