import { ApiProperty } from '@nestjs/swagger';

export class CountryDescriptionDto {
  @ApiProperty({
    description: 'Unique identifier for the country description',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiProperty({
    description: 'Language code for the description',
    example: 'en',
  })
  language: string;

  @ApiProperty({
    description: 'Description text in the specified language',
    example: 'Country with excellent quality of life and job opportunities.',
  })
  description: string;

  @ApiProperty({
    description: 'Country ID this description belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  country_id: string;
}
