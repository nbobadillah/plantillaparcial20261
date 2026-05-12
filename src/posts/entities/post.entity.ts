import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Comment } from './comment.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  caption!: string;

  @Column({ default: 0 })
  likes!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.posts, { onDelete: 'CASCADE' })
  user!: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments!: Comment[];
}
