import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from '../post/post.entity';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: false,
  })
  slug: string;

  @Column()
  description: string;

  @Column()
  schema: string;
  @Column()
  featuredImageUrl: string;

  //Define here for the bidirectional relationship
  @ManyToMany(() => Post, (post) => post.tags, {
    //When Many To Many Relationship, and if this is not the owning side, then you need to define cascade = true
    onDelete: 'CASCADE',
  })
  posts: Post[];

  @CreateDateColumn()
  createDate: Date;
  @UpdateDateColumn()
  updateDate: Date;
  @DeleteDateColumn()
  deleteDate: Date;
}
