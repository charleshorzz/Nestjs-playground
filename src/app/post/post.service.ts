import { Body, Injectable } from '@nestjs/common';
import { UserService } from '../users/providers/users.service';
import { CreatePostDto } from './dto/post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { MetaOptions } from '../meta-options/meta-options.entity';
import { TagService } from '../tag/tag.service';
import { PatchPostDto } from './dto/patch.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
    @InjectRepository(MetaOptions)
    private readonly metaOptionsRepository: Repository<MetaOptions>,
    private readonly userService: UserService,
    private readonly tagService: TagService,
  ) {}

  public async findAll(userId: string) {
    const user = this.userService.findAll(userId);

    const posts = await this.postRepository.find({
      relations: {
        metaOptions: true,
      },
    });

    return posts;
  }

  public async create(@Body() createPostDto: CreatePostDto) {
    const tags = await this.tagService.findMultipleTags(createPostDto.tags);
    //Create Post, after adding cascade property
    let post = this.postRepository.create({
      ...createPostDto,
      tags: tags,
    });
    //Return post to user
    return await this.postRepository.save(post);
  }

  public async update(patchPostDto: PatchPostDto) {
    //Find the tags
    let tags = await this.tagService.findMultipleTags(patchPostDto.tags);
    //Find the post
    let post = await this.postRepository.findOneBy({
      id: patchPostDto.id,
    });
    //Update the properties
    post.title = patchPostDto.title ?? post.title;
    post.content = patchPostDto.content ?? post.content;
    post.status = patchPostDto.status ?? post.status;
    post.postType = patchPostDto.postType ?? post.postType;
    post.slug = patchPostDto.slug ?? post.slug;
    post.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
    post.publishOn = patchPostDto.publishOn ?? post.publishOn;
    // Assing new tags
    post.tags = tags;

    //Save post and return
    return await this.postRepository.save(post);
  }

  //For delete, the cascade will work
  public async delete(id: number) {
    await this.postRepository.delete(id);

    return {
      deleted: true,
      id,
    };
  }
}
