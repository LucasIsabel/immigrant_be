import { ApiProperty } from '@nestjs/swagger';
import { CountryTranslationDto } from './country-translation.dto';

export class CountryDto {
  @ApiProperty({
    description: 'Unique identifier for the country',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'Country name',
    example: 'Canada',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'URL or path to the country flag image',
    example: '/flags/canada.png',
    type: String,
  })
  flag: string;

  @ApiProperty({
    description: 'Geographic region where the country is located',
    example: 'North America',
    type: String,
  })
  region: string;

  @ApiProperty({
    description: 'Difficulty level description for immigration',
    example: 'Moderate',
    type: String,
  })
  difficulty: string;

  @ApiProperty({
    description: 'Numeric score representing immigration difficulty (1-10)',
    example: 6,
    type: Number,
  })
  difficulty_score: number;

  @ApiProperty({
    description: 'Available visa options for immigration',
    type: [String],
    example: ['Work Visa', 'Student Visa', 'Express Entry'],
  })
  visa_options: string[];

  @ApiProperty({
    description: 'Job market conditions and opportunities',
    example: 'Strong job market with high demand for skilled workers',
    type: String,
  })
  job_market: string;

  @ApiProperty({
    description: 'Popular cities for immigrants',
    type: [String],
    example: ['Toronto', 'Vancouver', 'Montreal'],
  })
  popular_cities: string[];

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-01-15T10:30:00Z',
    type: Date,
  })
  created_at: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-01-15T10:30:00Z',
    type: Date,
  })
  updated_at: Date;

  @ApiProperty({
    description: 'URL or path to the background image',
    example: '/images/canada-background.jpg',
    type: String,
  })
  background_image: string;

  @ApiProperty({
    description: 'Country copy in each available language',
    type: [CountryTranslationDto],
  })
  translations: CountryTranslationDto[];
}
