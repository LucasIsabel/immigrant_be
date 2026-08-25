import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  IsOptional,
  IsString,
  Length,
  Matches,
  Min,
} from 'class-validator';

export class CreateCityIngestionDto {
  @ApiProperty({ description: 'ISO2 country code, uppercase', example: 'PT' })
  @IsString()
  @Length(2, 2)
  @Matches(/^[A-Z]{2}$/, { message: 'countryCode deve ser ISO2 maiúsculo' })
  countryCode: string;

  @ApiProperty({
    description: 'City as CountriesNow spells it, in English',
    example: 'Lisbon',
  })
  @IsString()
  @Length(1, 100)
  city: string;

  @ApiPropertyOptional({
    description:
      'Manual unblock: the OSM area id, for when automatic resolution failed. Skipping resolution is what rescues a city OpenStreetMap cannot find by name.',
    example: 3605400893,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  osmAreaId?: number;
}
