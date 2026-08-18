import { AI_SCENARIOS } from '@app/ai';
import { ApiProperty } from '@nestjs/swagger';
import { ArrayMaxSize, IsArray, IsString, MinLength } from 'class-validator';

export class UpdateAiModelConfigDto {
  @ApiProperty({
    description:
      'Modelo tentado primeiro. Slug da OpenRouter (ex.: anthropic/claude-sonnet-5) ou, ' +
      'prefixado com "gemini-direct:", um modelo servido pela API do Gemini.',
    example: 'anthropic/claude-sonnet-5',
    type: String,
  })
  @IsString()
  @MinLength(1)
  primaryModel: string;

  @ApiProperty({
    description:
      'Cadeia ordenada de alternativas, tentadas na ordem quando o anterior falha. ' +
      'Vale terminar com um item "gemini-direct:" — quando os créditos da OpenRouter acabam, ' +
      'nenhum modelo dela responde, então uma cadeia só de OpenRouter não tem para onde cair.',
    example: ['moonshotai/kimi-k2.5', 'gemini-direct:gemini-2.5-flash-lite'],
    type: [String],
  })
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(5)
  fallbackModels: string[];
}

export class AiModelConfigResponseDto {
  @ApiProperty({
    description: 'Cenário de uso do modelo',
    enum: AI_SCENARIOS,
    example: 'blog_writing_opinion',
    type: String,
  })
  scenario: string;

  @ApiProperty({ example: 'anthropic/claude-sonnet-5', type: String })
  primaryModel: string;

  @ApiProperty({
    example: ['moonshotai/kimi-k2.5', 'gemini-direct:gemini-2.5-flash-lite'],
    type: [String],
  })
  fallbackModels: string[];

  @ApiProperty({
    description:
      'false quando o cenário ainda não tem linha no banco e está usando o default do código',
    example: true,
    type: Boolean,
  })
  persisted: boolean;
}

export class OpenRouterStatusDto {
  @ApiProperty({
    description:
      'true quando um 402 recente colocou a OpenRouter em cooldown e o roteador está usando a cadeia de fallback',
    example: false,
    type: Boolean,
  })
  blocked: boolean;

  @ApiProperty({
    description: 'Quando o cooldown expira; null quando não há cooldown ativo',
    example: null,
    type: String,
    nullable: true,
  })
  blockedUntil: Date | null;
}
