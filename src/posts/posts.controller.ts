import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiKeyGuard } from '../auth/api-key.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { PostsService } from './posts.service';

@Controller('posts')
@UseGuards(ApiKeyGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post(':id/comments')
  @HttpCode(HttpStatus.CREATED)
  createComment(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateCommentDto,
  ) {
    return this.postsService.createComment(id, dto);
  }
}
