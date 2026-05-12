import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../../posts/entities/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  username!: string;

  @Column({ type: 'text', nullable: true })
  bio!: string | null;

  @Column({ default: 0 })
  followers!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Post, (post) => post.user)
  posts!: Post[];
}
