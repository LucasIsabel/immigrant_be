import { ApiProperty } from '@nestjs/swagger';

export class CheckSlugResponseDto {
  @ApiProperty({ example: true, description: 'true se o slug está disponível' })
  available: boolean;

  @ApiProperty({
    example: 'meu-restaurante-centro',
    description: 'Slug verificado',
  })
  slug: string;
}
