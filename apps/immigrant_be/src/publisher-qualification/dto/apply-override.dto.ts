import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString, MinLength } from 'class-validator';

export class ApplyOverrideDto {
  @ApiProperty({
    description: 'true = forçar qualificado, false = bloquear qualificação',
  })
  @IsBoolean()
  value: boolean;

  @ApiProperty({ description: 'Motivo do override (obrigatório, mínimo 10 caracteres)' })
  @IsString()
  @MinLength(10)
  reason: string;
}
