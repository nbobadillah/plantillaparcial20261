import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../posts/entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async create(dto: CreateUserDto) {
    const user = this.usersRepository.create({
      username: dto.username.trim(),
      bio: dto.bio?.trim() ?? null,
      followers: dto.followers ?? 0,
    });
    const savedUser = await this.usersRepository.save(user);

    return this.usersRepository.findOneByOrFail({ id: savedUser.id });
  }

  findAll() {
    return this.usersRepository.find({
      relations: { posts: true },
      order: { id: 'ASC', posts: { id: 'ASC' } },
    });
  }

  async createPost(userId: number, dto: CreatePostDto) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const post = this.postsRepository.create({
      caption: dto.caption.trim(),
      likes: dto.likes ?? 0,
      user,
    });
    const savedPost = await this.postsRepository.save(post);

    return this.postsRepository.findOneByOrFail({ id: savedPost.id });
  }

  async findPostsByUser(userId: number) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return this.postsRepository.find({
      where: { user: { id: userId } },
      relations: { comments: true },
      order: { id: 'ASC', comments: { id: 'ASC' } },
    });
  }
}
