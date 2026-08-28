import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class ReportTourGuideReviewDto {
  @ApiProperty({
    description: 'What is wrong with the review.',
    example: 'A avaliação acusa o guia de um crime, sem nada que sustente.',
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

export class ReportTourGuideReviewResponseDto {
  @ApiProperty({ example: true })
  received: boolean;
}
