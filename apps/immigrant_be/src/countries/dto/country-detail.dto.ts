import { ApiProperty } from '@nestjs/swagger';
import { CountryDto } from './country.dto';

/** Visa type as embedded in country detail (no nested country to avoid circular ref). */
class ImmigrationVisaTypeEmbeddedDto {
  @ApiProperty({ description: 'Unique identifier', type: String })
  id: string;

  @ApiProperty({
    description: 'Visa category/name',
    example: 'Express Entry',
    type: String,
  })
  category: string;

  @ApiProperty({ description: 'Description of the visa type', type: String })
  description: string;

  @ApiProperty({ description: 'Source URL or reference', type: String })
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

  @ApiProperty({ description: 'Country ID', type: String })
  country_id: string;

  @ApiProperty({
    description:
      'How many tasks this visa type generates in a plan. Zero when the ' +
      'visa type has no steps configured yet.',
    example: 22,
    type: Number,
    required: false,
  })
  steps_count?: number;
}

export class CountryDetailDto extends CountryDto {
  @ApiProperty({
    description: 'Immigration visa types available for this country',
    type: [ImmigrationVisaTypeEmbeddedDto],
  })
  immigration_visa_types: ImmigrationVisaTypeEmbeddedDto[];
}
