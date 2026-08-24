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
