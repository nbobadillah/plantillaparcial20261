import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  async createComment(postId: number, dto: CreateCommentDto) {
    const post = await this.postsRepository.findOne({ where: { id: postId } });

    if (!post) {
      throw new NotFoundException('Post no encontrado');
    }

    const comment = this.commentsRepository.create({
      content: dto.content.trim(),
      author: dto.author.trim(),
      post,
    });
    const savedComment = await this.commentsRepository.save(comment);

    return this.commentsRepository.findOneByOrFail({ id: savedComment.id });
  }
}
