import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class GenerateAiBlogPostDto {
  @ApiProperty({
    description: 'ID do país para buscar notícias e gerar o post',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  country_id: string;

  @ApiProperty({
    description: 'ID da categoria do blog para o post gerado',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  @IsNotEmpty()
  category_id: string;
}
