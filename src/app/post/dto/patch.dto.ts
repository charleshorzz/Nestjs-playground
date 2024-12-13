import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { CreatePostDto } from './post.dto';

export class PatchPostDto extends PartialType(CreatePostDto) {
  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  id: number;
}
