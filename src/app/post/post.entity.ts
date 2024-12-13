import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { postStatus, postType } from './post.constant';
import { MetaOptions } from '../meta-options/meta-options.entity';
import { User } from '../users/user.entity';
import { Tag } from '../tag/tag.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    type: 'enum',
    enum: postType,
    default: postType.Post,
  })
  postType: string;

  @Column({
    unique: true,
  })
  slug: string;

  @Column({
    type: 'enum',
    enum: postStatus,
    default: postStatus.Draft,
  })
  status: string;

  @Column()
  content?: string;

  @Column()
  schema?: string;

  @Column()
  featuredImageUrl: string;

  @Column({
    type: 'timestamp',
  })
  publishOn?: Date;

  @OneToOne(() => MetaOptions, (metaOptions) => metaOptions.post, {
    // execute CRUD actions with the nested entity
    cascade: true,
    // return the nested entity
    eager: true,
  })
  @JoinColumn()
  metaOptions?: MetaOptions;

  // Foregin key lies here
  @ManyToOne(() => User, (user) => user.posts)
  author: User;

  //Many To Many Relationship
  @ManyToMany(() => Tag, (tag) => tag.posts)
  //Owning side of relationship, fetch post along with tags
  @JoinTable()
  tags?: Tag[];
}
