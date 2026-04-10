import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';
import {
  ApiBadRequestResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { BusinessService } from './business.service';
import { CreateBusinessDto } from './dto/create-business.dto';
import { UpdateBusinessDto } from './dto/update-business.dto';
import { BusinessResponseDto } from './dto/business-response.dto';
import { ToggleVisibilityDto } from './dto/toggle-visibility.dto';

@ApiTags('Business')
@Controller('business')
export class BusinessController {
  constructor(private readonly service: BusinessService) {}

  @Get('me')
  @Roles(UserRole.USER)
  @ApiCookieAuth('better-auth.session_token')
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  @ApiOperation({ summary: 'Listar meus negócios' })
  @ApiOkResponse({ type: [BusinessResponseDto] })
  getMyBusinesses(@Session() session: UserSession) {
    return this.service.getMyBusinesses(session.user.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(UserRole.USER)
  @ApiCookieAuth('better-auth.session_token')
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  @ApiOperation({ summary: 'Criar novo negócio' })
  @ApiCreatedResponse({ type: BusinessResponseDto })
  create(@Body() dto: CreateBusinessDto, @Session() session: UserSession) {
    return this.service.create(session.user.id, dto);
  }

  @Post(':id/draft/publish')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.USER)
  @ApiCookieAuth('better-auth.session_token')
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @ApiBadRequestResponse({ description: 'Nenhum rascunho para publicar' })
  @ApiOperation({
    summary: 'Publicar rascunho do negócio (aplica alterações ao vivo)',
  })
  @ApiParam({ name: 'id', description: 'ID do negócio' })
  @ApiOkResponse({ type: BusinessResponseDto })
  publishDraft(@Param('id') id: string, @Session() session: UserSession) {
    return this.service.publishDraft(id, session.user.id);
  }

  @Delete(':id/draft')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.USER)
  @ApiCookieAuth('better-auth.session_token')
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @ApiBadRequestResponse({ description: 'Nenhum rascunho para descartar' })
  @ApiOperation({ summary: 'Descartar rascunho do negócio' })
  @ApiParam({ name: 'id', description: 'ID do negócio' })
  @ApiOkResponse({ type: BusinessResponseDto })
  discardDraft(@Param('id') id: string, @Session() session: UserSession) {
    return this.service.discardDraft(id, session.user.id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.USER)
  @ApiCookieAuth('better-auth.session_token')
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @ApiOperation({
    summary:
      'Guardar rascunho do negócio (alterações não vão ao vivo até publicar)',
  })
  @ApiParam({ name: 'id', description: 'ID do negócio' })
  @ApiOkResponse({ type: BusinessResponseDto })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateBusinessDto,
    @Session() session: UserSession,
  ) {
    return this.service.update(id, session.user.id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.USER)
  @ApiCookieAuth('better-auth.session_token')
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @ApiOperation({ summary: 'Remover negócio' })
  @ApiParam({ name: 'id', description: 'ID do negócio' })
  @ApiOkResponse({ type: BusinessResponseDto })
  delete(@Param('id') id: string, @Session() session: UserSession) {
    return this.service.delete(id, session.user.id);
  }

  @Patch(':id/visibility')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.USER)
  @ApiCookieAuth('better-auth.session_token')
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @ApiNotFoundResponse({ description: 'Negócio não encontrado' })
  @ApiOperation({ summary: 'Alternar visibilidade do negócio' })
  @ApiParam({ name: 'id', description: 'ID do negócio' })
  @ApiOkResponse({ type: BusinessResponseDto })
  toggleVisibility(
    @Param('id') id: string,
    @Body() dto: ToggleVisibilityDto,
    @Session() session: UserSession,
  ) {
    return this.service.toggleVisibility(id, session.user.id, dto.isPublic);
  }
}
