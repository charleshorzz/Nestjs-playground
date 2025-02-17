import { Body, Controller, Post } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dtos/create-tag.dto';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post()
  public async create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }
}
