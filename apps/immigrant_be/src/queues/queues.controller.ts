import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ADMIN_VISIBLE_QUEUES } from '@app/config/constants';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { ListQueueJobsQueryDto } from './dto/list-queue-jobs-query.dto';
import { PaginatedQueueJobsDto, QueueJobDto } from './dto/queue-job.dto';
import { QueueSummaryDto } from './dto/queue-summary.dto';
import { QueuesService } from './queues.service';

@ApiTags('Admin Queues')
@Controller('admin/queues')
@Roles(UserRole.ADMIN)
@ApiCookieAuth('better-auth.session_token')
@ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
@ApiForbiddenResponse({ description: 'Requer role de administrador' })
export class QueuesController {
  constructor(private readonly queuesService: QueuesService) {}

  @Get()
  @ApiOperation({
    summary: 'Listar filas visíveis ao admin',
    description:
      'Contagens por estado e se a fila está pausada. Só as quatro filas de conteúdo (blog, imagem de blog, tradução, media generator).',
  })
  @ApiOkResponse({ type: [QueueSummaryDto] })
  listQueues(): Promise<QueueSummaryDto[]> {
    return this.queuesService.listQueues();
  }

  @Get(':name/jobs')
  @ApiOperation({
    summary: 'Listar jobs de uma fila',
    description:
      'Payload sanitizado (sem prompt, markdown ou conteúdo longo). Sem `state`, lista o conjunto ao vivo: waiting, active, delayed, failed.',
  })
  @ApiParam({ name: 'name', enum: ADMIN_VISIBLE_QUEUES })
  @ApiOkResponse({ type: PaginatedQueueJobsDto })
  @ApiNotFoundResponse({ description: 'Fila desconhecida' })
  @ApiBadRequestResponse({ description: 'Estado inválido' })
  listJobs(
    @Param('name') name: string,
    @Query() query: ListQueueJobsQueryDto,
  ): Promise<PaginatedQueueJobsDto> {
    return this.queuesService.listJobs(name, query);
  }

  @HttpCode(HttpStatus.OK)
  @Post(':name/jobs/:id/retry')
  @ApiOperation({
    summary: 'Repetir um job',
    description:
      'Job falho volta para a fila (`retry`). Job atrasado é promovido (`promote`). Outros estados respondem 400.',
  })
  @ApiParam({ name: 'name', enum: ADMIN_VISIBLE_QUEUES })
  @ApiParam({ name: 'id', example: '4812' })
  @ApiOkResponse({ type: QueueJobDto })
  @ApiNotFoundResponse({ description: 'Fila ou job desconhecido' })
  @ApiBadRequestResponse({
    description: 'Job não pode ser repetido neste estado',
  })
  retryJob(
    @Param('name') name: string,
    @Param('id') id: string,
  ): Promise<QueueJobDto> {
    return this.queuesService.retryJob(name, id);
  }

  @Delete(':name/jobs/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover um job da fila' })
  @ApiParam({ name: 'name', enum: ADMIN_VISIBLE_QUEUES })
  @ApiParam({ name: 'id', example: '4812' })
  @ApiNoContentResponse({ description: 'Job removido' })
  @ApiNotFoundResponse({ description: 'Fila ou job desconhecido' })
  @ApiConflictResponse({
    description: 'Job ativo ou travado não pode ser removido',
  })
  removeJob(
    @Param('name') name: string,
    @Param('id') id: string,
  ): Promise<void> {
    return this.queuesService.removeJob(name, id);
  }

  @HttpCode(HttpStatus.OK)
  @Post(':name/pause')
  @ApiOperation({
    summary: 'Pausar uma fila',
    description: 'Workers deixam de pegar jobs novos. Jobs ativos terminam.',
  })
  @ApiParam({ name: 'name', enum: ADMIN_VISIBLE_QUEUES })
  @ApiOkResponse({ type: QueueSummaryDto })
  @ApiNotFoundResponse({ description: 'Fila desconhecida' })
  pauseQueue(@Param('name') name: string): Promise<QueueSummaryDto> {
    return this.queuesService.pauseQueue(name);
  }

  @HttpCode(HttpStatus.OK)
  @Post(':name/resume')
  @ApiOperation({ summary: 'Retomar uma fila pausada' })
  @ApiParam({ name: 'name', enum: ADMIN_VISIBLE_QUEUES })
  @ApiOkResponse({ type: QueueSummaryDto })
  @ApiNotFoundResponse({ description: 'Fila desconhecida' })
  resumeQueue(@Param('name') name: string): Promise<QueueSummaryDto> {
    return this.queuesService.resumeQueue(name);
  }
}
