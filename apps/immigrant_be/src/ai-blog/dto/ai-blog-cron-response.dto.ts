import { ApiProperty } from '@nestjs/swagger';

export class AiBlogCronResponseDto {
  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  country_id: string;

  @ApiProperty({ example: { id: '...', name: 'Canada', flag: '🇨🇦' } })
  country: { id: string; name: string; flag: string };

  @ApiProperty({ example: '123e4567-e89b-12d3-a456-426614174000' })
  category_id: string;

  @ApiProperty({ example: '0 8 * * *' })
  cron_expr: string;

  @ApiProperty({ example: true })
  is_active: boolean;

  @ApiProperty({ example: '2025-01-01T08:00:00.000Z', nullable: true })
  last_run_at: Date | null;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  created_at: Date;

  @ApiProperty({ example: '2025-01-01T00:00:00.000Z' })
  updated_at: Date;
}
