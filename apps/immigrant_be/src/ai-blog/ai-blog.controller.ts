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
} from '@nestjs/common';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { AiBlogService } from './ai-blog.service';
import { GenerateAiBlogPostDto } from './dto/generate-ai-blog-post.dto';
import { CreateAiBlogCronDto } from './dto/create-ai-blog-cron.dto';
import { UpdateAiBlogCronDto } from './dto/update-ai-blog-cron.dto';
import { AiBlogCronResponseDto } from './dto/ai-blog-cron-response.dto';
import { UpdateBlogPostDto } from '../blog/dto/update-blog-post.dto';
import { PendingAiBlogPostResponseDto } from './dto/pending-ai-blog-post-response.dto';

@ApiTags('AI Blog')
@Controller('admin/ai/blog')
@Roles(UserRole.ADMIN)
@ApiCookieAuth('better-auth.session_token')
@ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
@ApiForbiddenResponse({ description: 'Requer role de administrador' })
export class AiBlogController {
  constructor(private readonly aiBlogService: AiBlogService) {}

  // ─── Generation ───────────────────────────────────────────────────────────

  @Post('generate')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({
    summary: 'Gerar post com IA',
    description:
      'Enfileira a geração de um post de blog com IA para o país informado. O post ficará em DRAFT na fila de aprovação.',
  })
  @ApiResponse({ status: 202, description: 'Geração enfileirada com sucesso' })
  generate(
    @Body() dto: GenerateAiBlogPostDto,
    @Session() session: UserSession,
  ) {
    return this.aiBlogService.enqueueGeneration(dto, session?.user?.id);
  }

  // ─── Pending Posts ────────────────────────────────────────────────────────

  @Get('pending')
  @ApiOperation({
    summary: 'Listar posts pendentes de aprovação',
    description: 'Retorna posts DRAFT gerados por IA aguardando revisão',
  })
  @ApiResponse({
    status: 200,
    description: 'Posts listados com sucesso',
    type: [PendingAiBlogPostResponseDto],
  })
  findPendingPosts() {
    return this.aiBlogService.findPendingPosts();
  }

  @Patch('pending/:id/approve')
  @ApiOperation({
    summary: 'Aprovar post gerado por IA',
    description: 'Publica o post (status DRAFT → PUBLISHED)',
  })
  @ApiParam({ name: 'id', description: 'ID do post' })
  @ApiResponse({ status: 200, description: 'Post publicado com sucesso' })
  @ApiNotFoundResponse({ description: 'Post não encontrado' })
  approvePost(@Param('id') id: string) {
    return this.aiBlogService.approvePost(id);
  }

  @Patch('pending/:id')
  @ApiOperation({
    summary: 'Editar post pendente de aprovação',
    description:
      'Atualiza campos de um post DRAFT gerado por IA antes da aprovação',
  })
  @ApiParam({ name: 'id', description: 'ID do post' })
  @ApiResponse({ status: 200, description: 'Post atualizado com sucesso' })
  @ApiNotFoundResponse({
    description: 'Post não encontrado ou não está em DRAFT',
  })
  updatePendingPost(@Param('id') id: string, @Body() dto: UpdateBlogPostDto) {
    return this.aiBlogService.updatePendingPost(id, dto);
  }

  @Delete('pending/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Rejeitar e remover post gerado por IA',
    description: 'Remove permanentemente o post DRAFT',
  })
  @ApiParam({ name: 'id', description: 'ID do post' })
  @ApiNoContentResponse({ description: 'Post removido com sucesso' })
  @ApiNotFoundResponse({ description: 'Post não encontrado' })
  rejectPost(@Param('id') id: string) {
    return this.aiBlogService.rejectPost(id);
  }

  @Post('refine/:id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({
    summary: 'Refinar post com imagens',
    description:
      'Enfileira o refinamento de um post DRAFT gerado por IA: substitui marcadores [Visual sugerido] por imagens geradas via Gemini.',
  })
  @ApiParam({ name: 'id', description: 'ID do post' })
  @ApiResponse({
    status: 202,
    description: 'Refinamento enfileirado com sucesso',
  })
  @ApiNotFoundResponse({
    description: 'Post não encontrado ou não elegível para refinamento',
  })
  enqueueRefinement(@Param('id') id: string, @Session() session: UserSession) {
    return this.aiBlogService.enqueueRefinement(id, session?.user?.id);
  }

  // ─── Cron Jobs ────────────────────────────────────────────────────────────

  @Get('cron')
  @ApiOperation({
    summary: 'Listar cron jobs de geração de posts',
    description: 'Retorna todos os cron jobs configurados',
  })
  @ApiResponse({
    status: 200,
    description: 'Cron jobs listados',
    type: [AiBlogCronResponseDto],
  })
  findAllCronJobs() {
    return this.aiBlogService.findAllCronJobs();
  }

  @Post('cron')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Criar cron job',
    description: 'Cria um novo cron job para geração automática de posts',
  })
  @ApiCreatedResponse({
    description: 'Cron job criado com sucesso',
    type: AiBlogCronResponseDto,
  })
  createCronJob(@Body() dto: CreateAiBlogCronDto) {
    return this.aiBlogService.createCronJob(dto);
  }

  @Patch('cron/:id')
  @ApiOperation({
    summary: 'Atualizar cron job',
    description: 'Atualiza expressão, país, categoria ou ativa/desativa o cron',
  })
  @ApiParam({ name: 'id', description: 'ID do cron job' })
  @ApiResponse({
    status: 200,
    description: 'Cron job atualizado',
    type: AiBlogCronResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Cron job não encontrado' })
  updateCronJob(@Param('id') id: string, @Body() dto: UpdateAiBlogCronDto) {
    return this.aiBlogService.updateCronJob(id, dto);
  }

  @Delete('cron/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Remover cron job',
    description: 'Remove o cron job e cancela o agendamento no BullMQ',
  })
  @ApiParam({ name: 'id', description: 'ID do cron job' })
  @ApiNoContentResponse({ description: 'Cron job removido com sucesso' })
  @ApiNotFoundResponse({ description: 'Cron job não encontrado' })
  deleteCronJob(@Param('id') id: string) {
    return this.aiBlogService.deleteCronJob(id);
  }
}
