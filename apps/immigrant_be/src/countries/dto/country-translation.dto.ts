import { ApiProperty } from '@nestjs/swagger';

export class CountryTranslationDto {
  @ApiProperty({
    description: 'Unique identifier for the country translation',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'Language code for this translation',
    example: 'en',
    type: String,
  })
  language: string;

  @ApiProperty({
    description: 'Description text in the specified language',
    example: 'Country with excellent quality of life and job opportunities.',
    type: String,
  })
  description: string;

  @ApiProperty({
    description: 'Benefits of immigrating to this country, in this language',
    example: ['Universal healthcare', 'High-quality education'],
    type: [String],
  })
  benefits: string[];

  @ApiProperty({
    description: 'Challenges of immigrating to this country, in this language',
    example: ['Cold weather', 'High cost of living'],
    type: [String],
  })
  challenges: string[];

  @ApiProperty({
    description: 'Average processing time, in this language',
    example: '6-12 months',
    type: String,
  })
  processing_time: string;

  @ApiProperty({
    description: 'Investment requirements, in this language',
    example: 'CAD 13,000 in proof of funds',
    type: String,
  })
  investment_required: string;

  @ApiProperty({
    description: 'Language requirements, in this language',
    example: 'English or French (CLB 7+)',
    type: String,
  })
  language_requirement: string;

  @ApiProperty({
    description: 'Country ID this translation belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  country_id: string;
}
