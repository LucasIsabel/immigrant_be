import { ApiProperty } from '@nestjs/swagger';

/**
 * Uma cidade que tem lugares cadastrados.
 *
 * `lat`/`lng` são a média das coordenadas dos lugares — é o centro que o mapa
 * usa ao abrir a cidade. Não existe model City, então este é o único lugar de
 * onde um centro confiável pode sair.
 */
export class PlaceCityDto {
  @ApiProperty({ description: 'ISO2 do país, maiúsculo', example: 'PT' })
  countryCode: string;

  @ApiProperty({ example: 'Lisbon' })
  city: string;

  @ApiProperty({
    description: 'Quantos lugares ativos a cidade tem',
    example: 10,
  })
  count: number;

  @ApiProperty({
    description: 'Centro do mapa: média das latitudes',
    example: 38.72,
  })
  lat: number;

  @ApiProperty({
    description: 'Centro do mapa: média das longitudes',
    example: -9.14,
  })
  lng: number;
}
