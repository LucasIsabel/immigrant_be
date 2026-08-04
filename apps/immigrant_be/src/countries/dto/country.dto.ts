import { ApiProperty } from '@nestjs/swagger';
import { CountryTranslationDto } from './country-translation.dto';

export class CountryDto {





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
