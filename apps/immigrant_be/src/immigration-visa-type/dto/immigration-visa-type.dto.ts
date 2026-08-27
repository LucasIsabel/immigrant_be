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
    example:
      'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/partner-309',
    type: String,
  })
  source: string;

  @ApiProperty({
    description:
      'How long the route takes, in the wording of the source it was taken ' +
      'from. Null when nothing states it for this specific visa type.',
    example: '80% of PR applications within 6 months',
    type: String,
    nullable: true,
    required: false,
  })
  processing_time: string | null;

  @ApiProperty({
    description:
      'Money the route demands (income threshold, investment or fees), in ' +
      'the wording of the source. Null when nothing states it.',
    example: 'EB-5: US$800,000 in a targeted employment area',
    type: String,
    nullable: true,
    required: false,
  })
  estimated_cost: string | null;

  @ApiProperty({
    description:
      'The documents the route requires, taken verbatim from the step ' +
      'template. Empty when the template records none.',
    example: ['Valid passport', 'Proof of accommodation'],
    type: [String],
  })
  main_requirements: string[];

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
