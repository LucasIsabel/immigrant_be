import { IsArray, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCountryDto {
  @ApiProperty({
    description: 'Nome do país',
    example: 'Canadá',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'URL da bandeira do país',
    example: 'https://example.com/canada-flag.png',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  flag: string;

  @ApiProperty({
    description: 'Região do país',
    example: 'América do Norte',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  region: string;

  @ApiProperty({
    description: 'Nível de dificuldade para imigração',
    example: 'Médio',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  difficulty: string;

  @ApiProperty({
    description: 'Pontuação de dificuldade (0-10)',
    example: 6,
    minimum: 0,
    type: Number,
  })
  @IsInt()
  @Min(0)
  difficulty_score: number;

  @ApiProperty({
    description: 'Opções de visto disponíveis',
    example: ['Express Entry', 'Provincial Nominee', 'Study Permit'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  visa_options: string[];

  @ApiProperty({
    description: 'Mercado de trabalho',
    example: 'Fortalecimento em tecnologia e saúde',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  job_market: string;

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
