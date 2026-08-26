import { ApiProperty } from '@nestjs/swagger';

/**
 * Deliberately the same body whether the report was stored or dropped as a
 * bot: telling the caller which one happened is telling a bot how to get past
 * the honeypot.
 */
export class ReportCommunityEventResponseDto {
  @ApiProperty({ example: true })
  received: boolean;
}
