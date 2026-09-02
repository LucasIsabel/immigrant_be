import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiCookieAuth,
  ApiConflictResponse,
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
import { BusinessPagesService } from './business-pages.service';
import {
  PublicBusinessPageListQueryDto,
  PublicBusinessPageListResponseDto,
} from './dto/public-business-page-list.dto';
import { CheckSlugQueryDto } from './dto/check-slug-query.dto';
import { CheckSlugResponseDto } from './dto/check-slug-response.dto';
import { BusinessPagePublicResponseDto } from './dto/business-page-public-response.dto';
import { CreateBusinessPageDto } from './dto/create-business-page.dto';
import { UpdateBusinessPageContentDto } from './dto/update-business-page-content.dto';
import { SubmitBusinessPageResponseDto } from './dto/submit-business-page-response.dto';
import { WithdrawSubmissionResponseDto } from './dto/withdraw-submission-response.dto';

@ApiTags('Business Pages')
@Controller('business-pages')
export class BusinessPagesController {
  constructor(private readonly service: BusinessPagesService) {}

  @Get('check-slug')
  @AllowAnonymous()
  @ApiOperation({
    summary: 'Verificar disponibilidade de slug para página pública',
  })
  @ApiOkResponse({ type: CheckSlugResponseDto })
  checkSlug(@Query() query: CheckSlugQueryDto): Promise<CheckSlugResponseDto> {
    return this.service.checkSlugAvailability(query.slug);
  }

  @Get('public')
  @AllowAnonymous()
  @ApiOperation({
    summary: 'Listar páginas públicas aprovadas (consumo do sitemap)',
    description:
      'Paginado, somente APPROVED/APPROVED_WITH_PENDING (conteúdo no ar), payload enxuto sem approvedContent/pendingContent.',
  })
  @ApiOkResponse({ type: PublicBusinessPageListResponseDto })
  listPublicPages(
    @Query() query: PublicBusinessPageListQueryDto,
  ): Promise<PublicBusinessPageListResponseDto> {
    return this.service.listPublicPages(query.page ?? 1, query.limit ?? 50);
  }

  @Get('public/:slug')
  @AllowAnonymous()
  @ApiOperation({ summary: 'Buscar página pública aprovada por slug' })
  @ApiParam({ name: 'slug', description: 'Slug único da página' })
  @ApiOkResponse({ type: BusinessPagePublicResponseDto })
  @ApiNotFoundResponse({ description: 'Página não encontrada ou não aprovada' })
  getPublicPage(
    @Param('slug') slug: string,
  ): Promise<BusinessPagePublicResponseDto> {
    return this.service.getPublicPage(
      slug,
    ) as unknown as Promise<BusinessPagePublicResponseDto>;
  }

  @Get('my/:businessId')
  @Roles(UserRole.USER)
  @ApiCookieAuth('better-auth.session_token')
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @ApiNotFoundResponse({ description: 'Nenhuma página para este negócio' })
  @ApiOperation({ summary: 'Buscar minha BusinessPage por businessId' })
  @ApiParam({ name: 'businessId', description: 'UUID do Business' })
  getMyPage(
    @Param('businessId') businessId: string,
    @Session() session: UserSession,
  ) {
    return this.service.getMyPage(businessId, session.user.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Roles(UserRole.USER)
  @ApiCookieAuth('better-auth.session_token')
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @ApiConflictResponse({ description: 'Página já existe ou slug indisponível' })
  @ApiCreatedResponse({ description: 'BusinessPage criada em DRAFT' })
  @ApiOperation({ summary: 'Criar BusinessPage em DRAFT' })
  createPage(
    @Body() dto: CreateBusinessPageDto,
    @Session() session: UserSession,
  ) {
    return this.service.createPage(session.user.id, dto);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.USER)
  @ApiCookieAuth('better-auth.session_token')
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @ApiOkResponse({ description: 'Rascunho salvo' })
  @ApiOperation({ summary: 'Salvar rascunho (atualiza pending_content)' })
  @ApiParam({ name: 'id', description: 'UUID da BusinessPage' })
  updateContent(
    @Param('id') id: string,
    @Body() dto: UpdateBusinessPageContentDto,
    @Session() session: UserSession,
  ) {
    return this.service.updateContent(id, session.user.id, dto);
  }

  @Post(':id/submit')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.USER)
  @ApiCookieAuth('better-auth.session_token')
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @ApiConflictResponse({ description: 'Página já está em análise' })
  @ApiOkResponse({ type: SubmitBusinessPageResponseDto })
  @ApiOperation({ summary: 'Submeter página para revisão' })
  @ApiParam({ name: 'id', description: 'UUID da BusinessPage' })
  submitPage(
    @Param('id') id: string,
    @Session() session: UserSession,
  ): Promise<SubmitBusinessPageResponseDto> {
    return this.service.submitForReview(id, session.user.id);
  }

  @Delete(':id/submission')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.USER)
  @ApiCookieAuth('better-auth.session_token')
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @ApiConflictResponse({ description: 'Página não está em análise' })
  @ApiOkResponse({ type: WithdrawSubmissionResponseDto })
  @ApiOperation({
    summary: 'Retirar a própria submissão da fila de revisão',
    description:
      'Sem penalidade: retirar não é ser reprovado. O conteúdo pendente continua guardado como rascunho do dono.',
  })
  @ApiParam({ name: 'id', description: 'UUID da BusinessPage' })
  withdrawSubmission(
    @Param('id') id: string,
    @Session() session: UserSession,
  ): Promise<WithdrawSubmissionResponseDto> {
    return this.service.withdrawSubmission(
      id,
      session.user.id,
    ) as unknown as Promise<WithdrawSubmissionResponseDto>;
  }

  @Post(':id/upload/logo')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.USER)
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: 5 * 1024 * 1024 } }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
    },
  })
  @ApiCookieAuth('better-auth.session_token')
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @ApiOkResponse({
    schema: { type: 'object', properties: { url: { type: 'string' } } },
  })
  @ApiOperation({ summary: 'Upload da logo da página pública' })
  @ApiParam({ name: 'id', description: 'UUID da BusinessPage' })
  uploadLogo(
    @Param('id') id: string,
    @Session() session: UserSession,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.uploadLogo(id, session.user.id, file);
  }

  @Post(':id/upload/cover')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.USER)
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: 5 * 1024 * 1024 } }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: { file: { type: 'string', format: 'binary' } },
    },
  })
  @ApiCookieAuth('better-auth.session_token')
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  @ApiForbiddenResponse({ description: 'Acesso negado' })
  @ApiOkResponse({
    schema: { type: 'object', properties: { url: { type: 'string' } } },
  })
  @ApiOperation({ summary: 'Upload da foto de capa da página pública' })
  @ApiParam({ name: 'id', description: 'UUID da BusinessPage' })
  uploadCover(
    @Param('id') id: string,
    @Session() session: UserSession,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.uploadCover(id, session.user.id, file);
  }
}
