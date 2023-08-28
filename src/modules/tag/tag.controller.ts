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
import { Public } from 'src/decorators/public.decorator';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  @Public()
  async findList(@Query() query: object) {
    return await this.tagService.findList(query);
  }

  @Post()
  async createTag(@Body() body: any) {
    return await this.tagService.create(body);
  }

  @Put(':id')
  async updateTag(@Param('id') id: number, @Body() tag) {
    return await this.tagService.updateById(id, tag);
  }

  @Delete(':id')
  async deleteTag(@Param('id') id: number) {
    return await this.tagService.deleteById(id);
  }
}
