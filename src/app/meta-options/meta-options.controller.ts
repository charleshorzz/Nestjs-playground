import { Body, Controller, Post } from '@nestjs/common';
import { MetaOptionsService } from './meta-options.service';
import { CreateMetaOptionsDto } from './dto/post.meta.dto';

@Controller('meta-options')
export class MetaOptionsController {
  constructor(private readonly metaOptionsService: MetaOptionsService) {}

  @Post()
  public async createMetaOptions(@Body() metaOptions: CreateMetaOptionsDto) {
    console.log('metaOptions', metaOptions);
    return this.metaOptionsService.createMetaOptions(metaOptions);
  }
}
