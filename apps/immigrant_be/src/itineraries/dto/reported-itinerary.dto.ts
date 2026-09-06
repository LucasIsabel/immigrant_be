import { ApiProperty } from '@nestjs/swagger';
import { MyItinerarySummaryDto } from './itinerary-response.dto';

export class ItineraryReportDto {
  @ApiProperty() id: string;

  @ApiProperty({
    description:
      'O que a pessoa escreveu, tal como escreveu. Não é traduzido nem resumido: é a única coisa nesta tela que não é do produto.',
  })
  reason: string;

  @ApiProperty() createdAt: Date;
}

/**
 * An itinerary waiting for a decision.
 *
 * Extends the owner's summary rather than inventing a shape: the queue needs
 * the cover, the cities and the stop count to tell one itinerary from another,
 * and that summary already carries them — and already leaves out `userId`,
 * which an admin table has no more business showing than any other screen.
 */
export class ReportedItineraryDto extends MyItinerarySummaryDto {
  @ApiProperty({
    example: 3,
    description: 'Quantas denúncias ainda esperam decisão.',
  })
  reportCount: number;

  @ApiProperty({
    type: [ItineraryReportDto],
    description:
      'As dez mais recentes por decidir. O suficiente para ver se as queixas dizem a mesma coisa; a contagem ao lado diz quantas são ao todo.',
  })
  reports: ItineraryReportDto[];
}

export class PaginatedReportedItinerariesResponseDto {
  @ApiProperty({ type: [ReportedItineraryDto] })
  data: ReportedItineraryDto[];

  @ApiProperty({ example: 4 }) total: number;
  @ApiProperty({ example: 1 }) page: number;
  @ApiProperty({ example: 20 }) limit: number;
}

export class DismissReportsResponseDto {
  @ApiProperty({
    example: 3,
    description: 'Quantas denúncias ficaram respondidas. Zero é resposta.',
  })
  dismissed: number;
}
