import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  Matches,
  ValidateNested,
} from 'class-validator';

/**
 * A semana de funcionamento, como classe.
 *
 * Declarada assim, e não como `object`, porque é isto que vira tipo no
 * frontend: um `@IsObject()` solto faria o Kubb gerar `object` e o desencontro
 * ficaria invisível até alguém depurar um payload — a mesma lição que
 * `create-business.dto.ts` já registra sobre o `typeData`.
 *
 * As regras finas (ordem, sobreposição, meia-noite) vivem no Zod de
 * `opening-hours.schema.ts`, que é onde o horário é de fato validado. Aqui está
 * a forma, para o contrato ser honesto.
 */
export class OpeningIntervalDto {
  @ApiProperty({ example: '12:00', description: 'HH:MM, 24h' })
  @IsString()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, { message: 'use HH:MM' })
  open: string;

  @ApiProperty({
    example: '15:00',
    description:
      'HH:MM, 24h. Menor que `open` significa que o intervalo atravessa a ' +
      'meia-noite — um bar que fecha às 02:00 fecha no dia seguinte.',
  })
  @IsString()
  @Matches(/^([01]\d|2[0-3]):[0-5]\d$/, { message: 'use HH:MM' })
  close: string;
}

export class DayScheduleDto {
  @ApiProperty({
    example: false,
    description: 'Fechado o dia inteiro. Um dia ausente é "não informado".',
  })
  @IsBoolean()
  closed: boolean;

  @ApiPropertyOptional({ type: [OpeningIntervalDto], maxItems: 4 })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OpeningIntervalDto)
  @ArrayMinSize(1)
  @ArrayMaxSize(4)
  @IsOptional()
  intervals?: OpeningIntervalDto[];
}

export class WeeklyScheduleDto {
  @ApiPropertyOptional({ type: DayScheduleDto })
  @ValidateNested()
  @Type(() => DayScheduleDto)
  @IsOptional()
  monday?: DayScheduleDto;

  @ApiPropertyOptional({ type: DayScheduleDto })
  @ValidateNested()
  @Type(() => DayScheduleDto)
  @IsOptional()
  tuesday?: DayScheduleDto;

  @ApiPropertyOptional({ type: DayScheduleDto })
  @ValidateNested()
  @Type(() => DayScheduleDto)
  @IsOptional()
  wednesday?: DayScheduleDto;

  @ApiPropertyOptional({ type: DayScheduleDto })
  @ValidateNested()
  @Type(() => DayScheduleDto)
  @IsOptional()
  thursday?: DayScheduleDto;

  @ApiPropertyOptional({ type: DayScheduleDto })
  @ValidateNested()
  @Type(() => DayScheduleDto)
  @IsOptional()
  friday?: DayScheduleDto;

  @ApiPropertyOptional({ type: DayScheduleDto })
  @ValidateNested()
  @Type(() => DayScheduleDto)
  @IsOptional()
  saturday?: DayScheduleDto;

  @ApiPropertyOptional({ type: DayScheduleDto })
  @ValidateNested()
  @Type(() => DayScheduleDto)
  @IsOptional()
  sunday?: DayScheduleDto;
}
