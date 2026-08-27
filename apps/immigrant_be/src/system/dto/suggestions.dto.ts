import {
  IsNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsString,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { StepType } from './types.dto';

export class Steps {
  @ApiProperty({
    enum: StepType,
    description: 'Tipo de pergunta do formulário',
    type: String,
  })
  @IsEnum(StepType)
  type: StepType;

  @ApiProperty({
    description: 'Resposta do usuário para a pergunta',
    type: String,
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
  @Type(() => Steps)
  steps: Steps[];
}

export class SuggestionItem {
  @ApiProperty({
    description:
      'Country name in English, matching the catalogue. This is the lookup ' +
      'key, not display text — use country_label to show the name to the user.',
    example: 'New Zealand',
    type: String,
  })
  @IsString()
  country: string;

  @ApiProperty({
    description:
      'Country name in the language of the response, for display. Falls back ' +
      'to the English name when the model does not provide it.',
    example: 'Nova Zelândia',
    type: String,
  })
  @IsString()
  country_label: string;

  @ApiProperty({
    description: 'Compatibility percentage (0-100)',
    example: 85,
    minimum: 0,
    maximum: 100,
    type: Number,
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
    type: String,
  })
  @IsString()
  country_background: string;

  @ApiProperty({
    description: 'Country flag emoji or flag image URL',
    example: '🇨🇦',
    type: String,
  })
  @IsString()
  country_flag: string;

  @ApiProperty({
    description: 'ID of the country',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  country_id: string;

  @ApiProperty({
    description: 'Investment required for immigration',
    example: '$ 10.000,00 - $ 20.000,00',
    type: String,
  })
  @IsString()
  investment_required: string;

  @ApiProperty({
    description: 'Average visa processing time',
    example: '6-12 months',
    type: String,
  })
  @IsString()
  average_visa_processing_time: string;

  @ApiProperty({
    description: 'Job market',
    example: 'High',
    type: String,
  })
  @IsString()
  job_market: string;

  @ApiProperty({
    description: 'Education quality',
    example: 'High',
    type: String,
  })
  @IsString()
  education_quality: string;

  @ApiProperty({
    description: 'Difficulty',
    example: 'High',
    type: String,
  })
  @IsString()
  difficulty: string;

  @ApiProperty({
    description: 'Health care',
    example: 'High',
    type: String,
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

  @ApiProperty({
    description:
      'True when the passport the user answered the quiz with carries ' +
      'freedom of movement into this country (both are EU/EEA/Swiss): no ' +
      'visa is required, only registration after 90 days. False whenever the ' +
      'quiz carried no nationality step.',
    example: false,
    type: Boolean,
    default: false,
  })
  @IsBoolean()
  freedom_of_movement: boolean;
}

export class SuggestionsResponseDto {
  @ApiProperty({
    description: 'Array of country suggestions',
    type: [SuggestionItem],
  })
  @IsArray()
  suggestions: SuggestionItem[];
  @ApiProperty({
    description: 'ID of the suggestion',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  suggestion_id: string;
}
