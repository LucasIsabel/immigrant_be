import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

const SLUG_REGEX = /^[a-z0-9][a-z0-9-]{1,46}[a-z0-9]$/;

export class CheckSlugQueryDto {
  @ApiProperty({
    example: 'meu-restaurante-centro',
    description:
      'Slug desejado: letras minúsculas, números e hífens. Entre 3 e 48 caracteres.',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(48)
  @Matches(SLUG_REGEX, {
    message:
      'Slug deve conter apenas letras minúsculas, números e hífens, sem começar ou terminar com hífen.',
  })
  slug: string;
}
