import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class GeneralTypeDataDto {
  @ApiPropertyOptional({ example: 'Tecnologia' })
  @IsString()
  @IsOptional()
  serviceCategory?: string;

  @ApiPropertyOptional({
    type: [String],
    example: ['Consultoria', 'Suporte Técnico'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  servicesOffered?: string[];

  @ApiPropertyOptional({ example: 'Seg-Sex 9h-18h' })
  @IsString()
  @IsOptional()
  availability?: string;
}
