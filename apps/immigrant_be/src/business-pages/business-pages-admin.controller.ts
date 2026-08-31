import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { BusinessPagesService } from './business-pages.service';
import { ListBusinessPagesQueryDto } from './dto/list-business-pages-query.dto';
import { RejectBusinessPageDto } from './dto/reject-business-page.dto';

@ApiTags('Admin — Business Pages')
@Controller('admin/business-pages')
@Roles(UserRole.ADMIN)
@ApiCookieAuth('better-auth.session_token')
@ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
@ApiForbiddenResponse({ description: 'Acesso insuficiente' })
export class BusinessPagesAdminController {
  constructor(private readonly service: BusinessPagesService) {}

  @Get()
  @ApiOperation({ summary: 'Listar BusinessPages (admin, filtro por status)' })
  @ApiOkResponse({ description: 'Lista de páginas' })
  listPages(@Query() query: ListBusinessPagesQueryDto) {
    return this.service.listPages(query.status);
  }

  @Get(':id')
  @ApiOperation({
    summary:
      'Detalhe de BusinessPage (admin — pendingContent + approvedContent)',
  })
  @ApiOkResponse({
    description: 'Detalhe da página com conteúdo pendente e aprovado',
  })
  @ApiNotFoundResponse({ description: 'Página não encontrada' })
  @ApiParam({ name: 'id', description: 'UUID da BusinessPage' })
  getPageDetail(@Param('id') id: string) {
    return this.service.getPageDetail(id);
  }

  @Post(':id/moderate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Analisar conteúdo da página com IA (moderação)',
    description:
      'Roda a análise e **grava** o resultado na página, substituindo a ' +
      'anterior. Devolve o registro completo — veredicto, modelo, hora e a ' +
      'origem — para a tela poder dizer o que está mostrando sem um refetch.',
  })
  @ApiOkResponse({
    description:
      'Registro da análise: riskLevel, flags (com o caminho JSON do campo), ' +
      'summary, recommendation, model, analyzedAt e origin.',
  })
  @ApiNotFoundResponse({ description: 'Página não encontrada' })
  @ApiParam({ name: 'id', description: 'UUID da BusinessPage' })
  moderatePage(@Param('id') id: string) {
    return this.service.moderatePage(id);
  }

  @Post(':id/approve')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Aprovar BusinessPage' })
  @ApiOkResponse({ description: 'Página aprovada' })
  @ApiConflictResponse({ description: 'Página não está em análise' })
  @ApiNotFoundResponse({ description: 'Página não encontrada' })
  @ApiParam({ name: 'id', description: 'UUID da BusinessPage' })
  approvePage(@Param('id') id: string, @Session() session: UserSession) {
    return this.service.approveBusinessPage(id, session.user.id);
  }

  @Post(':id/reject')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reprovar BusinessPage' })
  @ApiOkResponse({ description: 'Página reprovada' })
  @ApiConflictResponse({ description: 'Página não está em análise' })
  @ApiNotFoundResponse({ description: 'Página não encontrada' })
  @ApiParam({ name: 'id', description: 'UUID da BusinessPage' })
  rejectPage(
    @Param('id') id: string,
    @Body() dto: RejectBusinessPageDto,
    @Session() session: UserSession,
  ) {
    return this.service.rejectBusinessPage(id, session.user.id, dto);
  }
}
