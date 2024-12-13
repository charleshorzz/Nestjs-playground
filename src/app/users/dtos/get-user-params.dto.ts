import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class GetUserParamsDto {
  @ApiPropertyOptional({
    description: 'Ger User With Specific ID',
    example: 123,
  })
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  id?: number;
}
