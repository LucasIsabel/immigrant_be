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
  @ApiProperty({ description: 'ISO2 do país, maiúsculo', example: 'PT' })
  @IsString()
  @Length(2, 2)
  @Matches(/^[A-Z]{2}$/, { message: 'countryCode deve ser ISO2 maiúsculo' })
  countryCode: string;

  @ApiProperty({
    description: 'Cidade no formato do CountriesNow, em inglês',
    example: 'Lisbon',
  })
  @IsString()
  @Length(1, 100)
  city: string;

  @ApiPropertyOptional({
    description:
      'Destrave manual: o id da área no OSM, quando a resolução automática falhou. Pular a resolução é o que tira do limbo a cidade que o OSM não acha por nome.',
    example: 3605400893,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  osmAreaId?: number;
}
