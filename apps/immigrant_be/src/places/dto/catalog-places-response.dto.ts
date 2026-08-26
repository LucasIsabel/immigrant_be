import { ApiProperty } from '@nestjs/swagger';
import { AdminPlaceResponseDto } from './city-ingestion-response.dto';

export class PaginatedCatalogPlacesResponseDto {
  @ApiProperty({ type: [AdminPlaceResponseDto] })
  data: AdminPlaceResponseDto[];

  @ApiProperty({ example: 42 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 20 })
  limit: number;
}
