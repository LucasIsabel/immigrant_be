import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CountriesNowCurrencyDto {
  @ApiProperty({ example: 'EUR' })
  @IsString()
  currencyCode!: string;

  @ApiProperty({ example: 'Portugal' })
  @IsString()
  countryName!: string;

  @ApiProperty({ example: 'PT' })
  @IsString()
  iso2!: string;
}
