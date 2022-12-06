import { Controller, Get, Query } from '@nestjs/common';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async findList(@Query() query: object) {
    return await this.tagService.findList(query);
  }
}
