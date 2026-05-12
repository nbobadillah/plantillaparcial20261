import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  content!: string;

  @Column()
  author!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
  post!: Post;
}
