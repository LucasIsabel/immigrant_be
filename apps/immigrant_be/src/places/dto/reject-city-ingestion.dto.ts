import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class RejectCityIngestionDto {
  @ApiProperty({
    description:
      'Why the city was turned down. Required: a rejection with no reason teaches nothing to whoever reprocesses it.',
    example: 'A área resolvida pegou a região metropolitana inteira.',
  })
  @IsString()
  @Length(3, 500)
  reason: string;
}

export class RejectPlaceDto {
  @ApiPropertyOptional({ description: 'Why this place was turned down' })
  @IsOptional()
  @IsString()
  @Length(3, 500)
  reason?: string;
}
