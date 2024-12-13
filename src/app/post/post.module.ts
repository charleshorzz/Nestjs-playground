import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { MetaOptions } from '../meta-options/meta-options.entity';
import { TagModule } from '../tag/tag.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [
    UsersModule,
    TagModule,
    TypeOrmModule.forFeature([MetaOptions, Post]),
  ],
})
export class PostModule {}
