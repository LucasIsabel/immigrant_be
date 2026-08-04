import { IsArray, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCountryDto {





  @ApiProperty({
    description: 'Cidades populares para imigrantes',
    example: ['Toronto', 'Vancouver', 'Montreal'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  popular_cities: string[];

  @ApiProperty({
    description: 'Imagem de fundo do país',
    example: 'https://example.com/canada-background.png',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  background_image: string;
}
