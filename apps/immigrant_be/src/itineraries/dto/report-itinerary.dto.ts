import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class ReportItineraryDto {
  @ApiProperty({
    description: 'What is wrong with the itinerary.',
    example: 'O título é ofensivo.',
  })
  @IsString()
  @Length(10, 500)
  reason: string;

  @ApiPropertyOptional({
    description:
      'Honeypot. Rendered invisible on the form; a bot that fills every field fills this one too, and the report is silently dropped.',
  })
  @IsOptional()
  @IsString()
  website?: string;
}

/**
 * Deliberately the same body whether the report was stored or dropped as a
 * bot: telling the caller which one happened is telling a bot how to get past
 * the honeypot.
 */
export class ReportItineraryResponseDto {
  @ApiProperty({ example: true })
  received: boolean;
}
