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
    description: 'Mercado de trabalho',
    example: 'Fortalecimento em tecnologia e saúde',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  jobMarket?: string;

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
