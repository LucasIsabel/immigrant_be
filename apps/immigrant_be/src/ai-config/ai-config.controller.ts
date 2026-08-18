import { AI_SCENARIOS } from '@app/ai';
import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { AiConfigService } from './ai-config.service';
import {
  AiModelConfigResponseDto,
  OpenRouterStatusDto,
  UpdateAiModelConfigDto,
} from './dto/ai-model-config.dto';

@ApiTags('AI Config')
@Controller('admin/ai/models')
@Roles(UserRole.ADMIN)
@ApiCookieAuth('better-auth.session_token')
@ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
@ApiForbiddenResponse({ description: 'Requer role de administrador' })
export class AiConfigController {
  constructor(private readonly aiConfigService: AiConfigService) {}

  @Get()
  @ApiOperation({
    summary: 'Lista o modelo de cada cenário de IA',
    description:
      'Inclui os cenários que ainda não têm linha no banco, marcados com `persisted: false` — ' +
      'nesse caso o valor exibido é o default do código.',
  })
  @ApiOkResponse({ type: [AiModelConfigResponseDto] })
  listConfigs(): Promise<AiModelConfigResponseDto[]> {
    return this.aiConfigService.listConfigs();
  }

  @Get('status')
  @ApiOperation({
    summary: 'Estado da OpenRouter',
    description:
      'Diz se a chave está configurada e se um 402 recente colocou a OpenRouter em cooldown — ' +
      'nesse caso as gerações estão saindo pela cadeia de fallback.',
  })
  @ApiOkResponse({ type: OpenRouterStatusDto })
  async getStatus(): Promise<OpenRouterStatusDto> {
    return await this.aiConfigService.getOpenRouterStatus();
  }

  @Put(':scenario')
  @ApiOperation({
    summary: 'Troca o modelo de um cenário',
    description:
      'Toma efeito na próxima geração, sem deploy. É por isso que a escolha de modelo mora no ' +
      'banco e não em variável de ambiente.',
  })
  @ApiParam({
    name: 'scenario',
    enum: AI_SCENARIOS,
    example: 'blog_writing_opinion',
  })
  @ApiBody({ type: UpdateAiModelConfigDto })
  @ApiOkResponse({ type: AiModelConfigResponseDto })
  @ApiBadRequestResponse({ description: 'Cenário desconhecido' })
  updateConfig(
    @Param('scenario') scenario: string,
    @Body() dto: UpdateAiModelConfigDto,
  ): Promise<AiModelConfigResponseDto> {
    return this.aiConfigService.updateConfig(scenario, dto);
  }
}
