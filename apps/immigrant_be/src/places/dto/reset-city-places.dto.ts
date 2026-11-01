import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { CityIngestionResponseDto } from './city-ingestion-response.dto';

export class ResetCityPlacesDto {
  @ApiProperty({ description: 'ISO2 country code, uppercase', example: 'PT' })
  @IsString()
  @Length(2, 2)
  @Matches(/^[A-Z]{2}$/, { message: 'countryCode deve ser ISO2 maiúsculo' })
  countryCode: string;

  @ApiProperty({
    description:
      'City whose places are deleted. Compared folded, like the catalogue filter.',
    example: 'Lisbon',
  })
  @IsString()
  @Length(1, 100)
  city: string;

  @ApiPropertyOptional({
    description:
      'Narrows the city to one of its namesakes. Omitted, every state of that city name is matched — the same as the catalogue list.',
    example: 'Mato Grosso do Sul',
  })
  @IsOptional()
  @IsString()
  @Length(1, 120)
  state?: string;

  @ApiPropertyOptional({
    description:
      'Start a new ingestion of the city right after deleting, reusing the categories and OSM area of the latest one.',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  reingest?: boolean;
}

export class ResetCityPlacesResponseDto {
  @ApiProperty({ description: 'Places deleted' })
  deleted: number;

  @ApiProperty({
    description:
      'REJECTED places left in place: they stop a re-ingestion from recreating what somebody refused',
  })
  keptRejected: number;

  @ApiProperty({
    type: CityIngestionResponseDto,
    nullable: true,
    description: 'The ingestion started, or null when `reingest` was false',
  })
  ingestion: CityIngestionResponseDto | null;
}
