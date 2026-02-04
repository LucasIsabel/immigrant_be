import { ApiProperty } from '@nestjs/swagger';

export class VisaStepsCountryDto {
  @ApiProperty({
    description: 'Country id',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'Country name',
    example: 'Australia',
    type: String,
  })
  name: string;

  @ApiProperty({
    description: 'Country flag URL',
    example: 'https://example.com/flags/au.png',
    type: String,
  })
  flag: string;
}

export class VisaStepsVisaTypeDto {
  @ApiProperty({
    description: 'Visa type id',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'Visa category name',
    example: 'Partner Visa',
    type: String,
  })
  category: string;

  @ApiProperty({
    description: 'Visa description',
    type: String,
  })
  description: string;

  @ApiProperty({
    description: 'Source URL',
    type: String,
  })
  source: string;

  @ApiProperty({
    description: 'Country for this visa type',
    type: VisaStepsCountryDto,
  })
  country: VisaStepsCountryDto;
}

export class VisaStepsDto {
  @ApiProperty({
    description: 'Visa steps id',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'Language code for the steps (e.g., en, pt, es)',
    example: 'en',
    type: String,
  })
  language: string;

  @ApiProperty({
    description: 'Steps payload as JSON object',
    type: Object,
  })
  steps: Record<string, any>;

  @ApiProperty({
    description: 'Visa type id',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  visa_type_id: string;

  @ApiProperty({
    description: 'Visa type details with country',
    type: VisaStepsVisaTypeDto,
  })
  visa_type: VisaStepsVisaTypeDto;

  @ApiProperty({
    description: 'Created at',
    type: Date,
  })
  created_at: Date;

  @ApiProperty({
    description: 'Updated at',
    type: Date,
  })
  updated_at: Date;
}
