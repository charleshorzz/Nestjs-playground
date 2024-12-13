import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOptions } from './meta-options.entity';
import { Repository } from 'typeorm';
import { CreateMetaOptionsDto } from './dto/post.meta.dto';

@Injectable()
export class MetaOptionsService {
  constructor(
    @InjectRepository(MetaOptions)
    private readonly metaOptionsRepository: Repository<MetaOptions>,
  ) {}

  public async createMetaOptions(metaOptions: CreateMetaOptionsDto) {
    const newMetaOptions = this.metaOptionsRepository.create(metaOptions);
    await this.metaOptionsRepository.save(newMetaOptions);
    return newMetaOptions;
  }
}
