import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiKeyGuard } from '../auth/api-key.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(ApiKeyGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateUserDto) {
    return this.usersService.create(dto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post(':id/posts')
  @HttpCode(HttpStatus.CREATED)
  createPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreatePostDto,
  ) {
    return this.usersService.createPost(id, dto);
  }

  @Get(':id/posts')
  findPostsByUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findPostsByUser(id);
  }
}
