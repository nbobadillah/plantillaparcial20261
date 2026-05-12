import { Type } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class CpmQueryDto {
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  cost!: number;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  impressions!: number;
}
