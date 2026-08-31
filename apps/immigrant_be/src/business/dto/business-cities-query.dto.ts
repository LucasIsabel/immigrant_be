import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class BusinessCitiesQueryDto {
  @ApiPropertyOptional({
    description: 'Country name as stored on the business, e.g. "Portugal"',
    example: 'Portugal',
  })
  @IsOptional()
  @IsString()
  @Length(1, 100)
  country?: string;
}
