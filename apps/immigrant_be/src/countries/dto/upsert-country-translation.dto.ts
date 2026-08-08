import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UpsertCountryTranslationDto {
  @ApiProperty({
    description: 'Descrição do país neste idioma',
    example: 'Country with excellent quality of life and job opportunities.',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Benefícios de imigrar para o país, neste idioma',
    example: ['Universal healthcare', 'High-quality education'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  benefits: string[];

  @ApiProperty({
    description: 'Desafios de imigrar para o país, neste idioma',
    example: ['Cold weather', 'High cost of living'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  challenges: string[];

  @ApiProperty({
    description: 'Tempo médio de processamento, neste idioma',
    example: '6-12 months',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  processing_time: string;

  @ApiProperty({
    description: 'Investimento exigido, neste idioma',
    example: 'CAD 13,000 in proof of funds',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  investment_required: string;

  @ApiProperty({
    description: 'Requisitos de idioma, neste idioma',
    example: 'English or French (CLB 7+)',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  language_requirement: string;
}
