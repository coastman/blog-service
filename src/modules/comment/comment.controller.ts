import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Put,
  Request,
} from '@nestjs/common';
import { Public } from 'src/decorators/public.decorator';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Public()
  @Get()
  async page(@Query() query: object) {
    return this.commentService.findPage(query);
  }

  @Public()
  @Get('/byArticle/:id')
  async findByArticleId(@Param('id') id: number) {
    return this.commentService.findByArticle(id);
  }

  @Public()
  @Post()
  async create(@Body() body: any, @Request() request: any) {
    const ip = request.ip.replace('::ffff:', '').replace('::1', '') || null;
    const agent = request.headers['user-agent'];
    body.ip = ip;
    body.agent = agent;
    return await this.commentService.create(body);
  }

  @Put(':id')
  async updateById(@Body() body: any, @Param('id') id: number) {
    return await this.commentService.updateById(body, id);
  }

  @Public()
  @Post('/like')
  async liking(@Body() body: any) {
    return await this.commentService.liking(body);
  }

  @Public()
  @Post('/down')
  async down(@Body() body: any) {
    return await this.commentService.downing(body);
  }
}
