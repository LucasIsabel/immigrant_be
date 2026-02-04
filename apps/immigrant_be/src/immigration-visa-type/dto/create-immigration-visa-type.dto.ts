import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateImmigrationVisaTypeDto {
  @ApiProperty({
    description: 'Category of the immigration visa type',
    example: 'Partner Visa',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  category: string;

  @ApiProperty({
    description: 'Description of the immigration visa type',
    example: 'Visa for partners of Australian citizens or permanent residents',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Source URL or reference for the visa type information',
    example: 'https://immi.homeaffairs.gov.au/visas/getting-a-visa/visa-listing/partner-309',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  source: string;

  @ApiProperty({
    description: 'Country ID that this visa type belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @IsUUID()
  @IsNotEmpty()
  country_id: string;
}
