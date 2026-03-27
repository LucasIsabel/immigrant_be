import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CountriesNowCountryDto {
  @ApiProperty({ example: 'PT' })
  @IsString()
  iso2!: string;

  @ApiProperty({ example: 'PRT' })
  @IsString()
  iso3!: string;

  @ApiProperty({ example: 'Portugal' })
  @IsString()
  country!: string;

  @ApiProperty({ type: [String], example: ['Lisbon', 'Porto'] })
  @IsArray()
  @IsString({ each: true })
  cities!: string[];
}
