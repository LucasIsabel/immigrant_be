import { ApiProperty } from '@nestjs/swagger';
import { CountryDto } from '../../countries/dto/country.dto';

export class ImmigrationVisaTypeDto {
  @ApiProperty({
    description: 'Unique identifier for the immigration visa type',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'Category of the immigration visa type',
    example: 'Partner Visa',
    type: String,
  })
  category: string;

  @ApiProperty({
    description: 'Description of the immigration visa type',
    example: 'Visa for partners of Australian citizens or permanent residents',
    type: String,
  })
  description: string;

  @ApiProperty({
    description: 'Source URL or reference for the visa type information',
    example: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/partner-309',
    type: String,
  })
  source: string;

  @ApiProperty({
    description: 'Country ID that this visa type belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  country_id: string;

  @ApiProperty({
    description: 'Country details (optional, included when relation is loaded)',
    type: CountryDto,
    required: false,
  })
  country?: CountryDto;
}
