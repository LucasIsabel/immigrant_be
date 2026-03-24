import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class TourItemDto {
  @ApiProperty({ example: 'Tour Histórico de Lisboa' })
  @IsString()
  name: string;

  @ApiProperty({ example: '3 horas' })
  @IsString()
  duration: string;

  @ApiProperty({ example: 45 })
  @IsNumber()
  price: number;
}

export class TourGuideTypeDataDto {
  @ApiPropertyOptional({
    type: [String],
    example: ['Português', 'Inglês', 'Espanhol'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  languages?: string[];

  @ApiPropertyOptional({ type: [TourItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TourItemDto)
  @IsOptional()
  tours?: TourItemDto[];

  @ApiPropertyOptional({ example: 'Praça do Comércio, Lisboa' })
  @IsString()
  @IsOptional()
  meetingPoint?: string;
}
