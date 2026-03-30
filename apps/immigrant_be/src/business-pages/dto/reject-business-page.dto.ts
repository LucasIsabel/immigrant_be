import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class RejectBusinessPageDto {
  @ApiPropertyOptional({ description: 'Motivo da reprovação (opcional)' })
  @IsOptional()
  @IsString()
  reason?: string;
}
