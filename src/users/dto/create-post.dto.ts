import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  caption!: string;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(0)
  likes?: number;
}
