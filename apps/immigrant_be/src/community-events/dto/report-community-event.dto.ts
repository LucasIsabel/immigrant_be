import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class ReportCommunityEventDto {
  @ApiProperty({
    description: 'What is wrong with the event.',
    example: 'O evento não existe no endereço indicado.',
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
