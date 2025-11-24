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
    description: 'Tempo de processamento do visto',
    example: '6-12 meses',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  processing_time: string;

  @ApiProperty({
    description: 'Investimento necessário',
    example: 'CAD 13,000 - 25,000',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  investment_required: string;

  @ApiProperty({
    description: 'Requisitos de idioma',
    example: 'IELTS 6.0 ou superior',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  language_requirement: string;

  @ApiProperty({
    description: 'Mercado de trabalho',
    example: 'Fortalecimento em tecnologia e saúde',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  job_market: string;

  @ApiProperty({
    description: 'Benefícios de imigrar para este país',
    example: [
      'Sistema de saúde público',
      'Educação gratuita',
      'Segurança social',
    ],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  benefits: string[];

  @ApiProperty({
    description: 'Desafios de imigrar para este país',
    example: ['Custo de vida alto', 'Clima rigoroso', 'Processo seletivo'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  challenges: string[];

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
