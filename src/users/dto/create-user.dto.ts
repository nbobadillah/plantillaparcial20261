import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @Type(() => Number)
  @IsOptional()
  @IsInt()
  @Min(0)
  followers?: number;
}
