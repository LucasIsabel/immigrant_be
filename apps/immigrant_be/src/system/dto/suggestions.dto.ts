import {
  IsNotEmpty,
  IsArray,
  IsEnum,
  IsString,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { StepType } from './types.dto';

export class Steps {
  @ApiProperty({
    enum: StepType,
    description: 'Tipo de pergunta do formulário',
  })
  @IsEnum(StepType)
  type: StepType;

  @ApiProperty({
    description: 'Resposta do usuário para a pergunta',
  })
  @IsString()
  @IsNotEmpty()
  answer: string;
}

export class SuggestionsDto {
  @ApiProperty({
    type: [Steps],
    description: 'Array de passos com perguntas e respostas do usuário',
  })
  @IsArray()
  @IsNotEmpty()
  steps: Steps[];
}

export class SuggestionItem {
  @ApiProperty({
    description: 'Name of the recommended country',
    example: 'Canada',
  })
  @IsString()
  country: string;

  @ApiProperty({
    description: 'Compatibility percentage (0-100)',
    example: 85,
    minimum: 0,
    maximum: 100,
  })
  @IsNumber()
  compatibility: number;

  @ApiProperty({
    description: 'List of reasons for the recommendation',
    example: [
      'Strong job market',
      'High quality of life',
      'Immigration-friendly policies',
    ],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  reasons: string[];

  @ApiProperty({
    description: 'Recommended cities in the country',
    example: ['Toronto', 'Vancouver', 'Montreal'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  cities: string[];

  @ApiProperty({
    description: 'Available visa options for immigration',
    example: ['Express Entry', 'Provincial Nominee Program', 'Study Permit'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  visa_options: string[];

  @ApiProperty({
    description: 'URL or path to the country background image',
    example: 'https://example.com/canada-background.jpg',
  })
  @IsString()
  country_background: string;

  @ApiProperty({
    description: 'Country flag emoji or flag image URL',
    example: '🇨🇦',
  })
  @IsString()
  country_flag: string;

  @ApiProperty({
    description: 'Investment required for immigration',
    example: '$ 10.000,00 - $ 20.000,00',
  })
  @IsString()
  investment_required: string;

  @ApiProperty({
    description: 'Average visa processing time',
    example: '6-12 months',
  })
  @IsString()
  average_visa_processing_time: string;

  @ApiProperty({
    description: 'Job market',
    example: 'High',
  })
  @IsString()
  job_market: string;

  @ApiProperty({
    description: 'Education quality',
    example: 'High',
  })
  @IsString()
  education_quality: string;

  @ApiProperty({
    description: 'Difficulty',
    example: 'High',
  })
  @IsString()
  difficulty: string;

  @ApiProperty({
    description: 'Health care',
    example: 'High',
  })
  @IsString()
  health_care: string;

  @ApiProperty({
    description: 'Languages',
    example: ['English', 'French', 'Spanish'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  languages: string[];
}

export class SuggestionsResponseDto {
  @ApiProperty({
    description: 'Array of country suggestions',
    type: [SuggestionItem],
  })
  @IsArray()
  suggestions: SuggestionItem[];
}
