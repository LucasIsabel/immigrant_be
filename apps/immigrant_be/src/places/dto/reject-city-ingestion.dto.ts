import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class RejectCityIngestionDto {
  @ApiProperty({
    description:
      'Por que a cidade foi recusada. Obrigatório: rejeição sem motivo não ensina nada a quem for reprocessar.',
    example: 'A área resolvida pegou a região metropolitana inteira.',
  })
  @IsString()
  @Length(3, 500)
  reason: string;
}

export class RejectPlaceDto {
  @ApiPropertyOptional({ description: 'Motivo da recusa deste lugar' })
  @IsOptional()
  @IsString()
  @Length(3, 500)
  reason?: string;
}
