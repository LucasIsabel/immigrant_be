import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class LegalTypeDataDto {
  @ApiPropertyOptional({
    type: [String],
    example: ['Direito de Imigração', 'Direito do Trabalho'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  specializations?: string[];

  @ApiPropertyOptional({ type: [String], example: ['Português', 'Inglês'] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  languages?: string[];

  @ApiPropertyOptional({ example: true })
  @IsBoolean()
  @IsOptional()
  offersOnlineConsultation?: boolean;
}
