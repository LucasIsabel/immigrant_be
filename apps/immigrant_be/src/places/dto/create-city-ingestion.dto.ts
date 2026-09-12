import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayUnique,
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Length,
  Matches,
  Min,
  ValidateIf,
} from 'class-validator';
import {
  CityIngestionScope,
  PlaceCategory,
} from '../../../../../generated/prisma';

export class CreateCityIngestionDto {
  @ApiProperty({ description: 'ISO2 country code, uppercase', example: 'PT' })
  @IsString()
  @Length(2, 2)
  @Matches(/^[A-Z]{2}$/, { message: 'countryCode deve ser ISO2 maiúsculo' })
  countryCode: string;

  @ApiPropertyOptional({
    enum: CityIngestionScope,
    default: CityIngestionScope.CITY,
    description:
      'CITY ingests the named city; COUNTRY sweeps the whole country. Omitted is CITY, which is what every ingestion was before #220.',
  })
  @IsOptional()
  @IsEnum(CityIngestionScope)
  scope?: CityIngestionScope;

  @ApiPropertyOptional({
    enum: PlaceCategory,
    isArray: true,
    default: [],
    description:
      'Which categories to look for. Empty — or omitted — means all of them, the behaviour a city ingestion has always had.',
  })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsEnum(PlaceCategory, { each: true })
  categories?: PlaceCategory[];

  @ApiPropertyOptional({
    description:
      'City as CountriesNow spells it, in English. Required when `scope` is CITY, and refused with 400 when it is COUNTRY — a sweep has no city, and each place it finds brings its own.',
    example: 'Lisbon',
  })
  @ValidateIf(
    (dto: CreateCityIngestionDto) =>
      (dto.scope ?? CityIngestionScope.CITY) === CityIngestionScope.CITY,
  )
  @IsString()
  @Length(1, 100)
  city?: string;

  @ApiPropertyOptional({
    description:
      'State of the city, as CountriesNow spells it. Tells namesakes apart — Campo Grande in Mato Grosso do Sul and Campo Grande in Alagoas are two ingestions that may run side by side — and steers the Wikidata resolution towards the right one.',
    example: 'Mato Grosso do Sul',
  })
  @IsOptional()
  @IsString()
  @Length(1, 120)
  state?: string;

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
