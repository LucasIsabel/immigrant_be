import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { AiConfigService } from './ai-config.service';
import { AiUsageQueryDto } from './dto/ai-usage-query.dto';
import { AiUsageResponseDto } from './dto/ai-usage-response.dto';

@ApiTags('AI Config')
@Controller('admin/ai/usage')
@Roles(UserRole.ADMIN)
@ApiCookieAuth('better-auth.session_token')
@ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
@ApiForbiddenResponse({ description: 'Requer role de administrador' })
export class AiUsageController {
  constructor(private readonly aiConfigService: AiConfigService) {}

  @Get()
  @ApiOperation({
    summary: 'Agrega custos e falhas de IA por cenário, modelo e período',
  })
  @ApiOkResponse({ type: AiUsageResponseDto })
  getUsage(@Query() query: AiUsageQueryDto): Promise<AiUsageResponseDto> {
    return this.aiConfigService.getUsage(query);
  }
}
