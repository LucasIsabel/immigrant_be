import { IsArray, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCountryDto {
  @ApiProperty({
    description: 'Nome do país',
    example: 'Canadá',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'URL da bandeira do país',
    example: 'https://example.com/canada-flag.png',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  flag?: string;

  @ApiProperty({
    description: 'Região do país',
    example: 'América do Norte',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  region?: string;

  @ApiProperty({
    description: 'Nível de dificuldade para imigração',
    example: 'Médio',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  difficulty?: string;

  @ApiProperty({
    description: 'Pontuação de dificuldade (0-10)',
    example: 6,
    minimum: 0,
    type: Number,
    required: false,
  })
  @IsInt()
  @Min(0)
  @IsOptional()
  difficultyScore?: number;

  @ApiProperty({
    description: 'Opções de visto disponíveis',
    example: ['Express Entry', 'Provincial Nominee', 'Study Permit'],
    type: [String],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  visaOptions?: string[];

  @ApiProperty({
    description: 'Tempo de processamento do visto',
    example: '6-12 meses',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  processingTime?: string;

  @ApiProperty({
    description: 'Investimento necessário',
    example: 'CAD 13,000 - 25,000',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  investmentRequired?: string;

  @ApiProperty({
    description: 'Requisitos de idioma',
    example: 'IELTS 6.0 ou superior',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  languageRequirement?: string;

  @ApiProperty({
    description: 'Mercado de trabalho',
    example: 'Fortalecimento em tecnologia e saúde',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  jobMarket?: string;

  @ApiProperty({
    description: 'Benefícios de imigrar para este país',
    example: [
      'Sistema de saúde público',
      'Educação gratuita',
      'Segurança social',
    ],
    type: [String],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  benefits?: string[];

  @ApiProperty({
    description: 'Desafios de imigrar para este país',
    example: ['Custo de vida alto', 'Clima rigoroso', 'Processo seletivo'],
    type: [String],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  challenges?: string[];

  @ApiProperty({
    description: 'Cidades populares para imigrantes',
    example: ['Toronto', 'Vancouver', 'Montreal'],
    type: [String],
    required: false,
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  popularCities?: string[];
}
