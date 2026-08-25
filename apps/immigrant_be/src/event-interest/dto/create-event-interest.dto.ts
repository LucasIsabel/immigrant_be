import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, Length, Matches } from 'class-validator';

export class CreateEventInterestDto {
  @ApiProperty({ description: 'Organizer name', example: 'Maria Silva' })
  @IsString()
  @Length(2, 120)
  name: string;

  @ApiProperty({
    description: 'How to reach the organizer — email, phone or Instagram',
    example: '@maria.eventos',
  })
  @IsString()
  @Length(3, 200)
  contact: string;

  @ApiProperty({
    description: 'What kind of event they want to promote',
    example: 'Live music',
  })
  @IsString()
  @Length(2, 80)
  eventType: string;

  @ApiProperty({ description: 'ISO2 country code, uppercase', example: 'PT' })
  @IsString()
  @Length(2, 2)
  @Matches(/^[A-Z]{2}$/, { message: 'countryCode deve ser ISO2 maiúsculo' })
  countryCode: string;

  @ApiProperty({ example: 'Lisbon' })
  @IsString()
  @Length(1, 100)
  city: string;

  @ApiPropertyOptional({ description: 'Anything else they want to say' })
  @IsOptional()
  @IsString()
  @Length(0, 500)
  message?: string;

  @ApiPropertyOptional({
    description:
      'Honeypot. Rendered invisible on the form; a bot that fills every field fills this one too, and the submission is silently dropped.',
  })
  @IsOptional()
  @IsString()
  website?: string;
}
