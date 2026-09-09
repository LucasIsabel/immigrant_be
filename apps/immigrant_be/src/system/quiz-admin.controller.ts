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
import { QuizAnalyticsService } from './quiz-analytics.service';
import { QuizAnalyticsQueryDto } from './dto/quiz-analytics-query.dto';
import { QuizAnalyticsResponseDto } from './dto/quiz-analytics-response.dto';
import { ListQuizSubmissionsQueryDto } from './dto/list-quiz-submissions-query.dto';
import { PaginatedQuizSubmissionsResponseDto } from './dto/quiz-submission-response.dto';

@ApiTags('Admin — Quiz')
@Controller('admin/quiz')
@Roles(UserRole.ADMIN)
@ApiCookieAuth('better-auth.session_token')
@ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
@ApiForbiddenResponse({ description: 'Acesso insuficiente' })
export class QuizAdminController {
  constructor(private readonly service: QuizAnalyticsService) {}

  @Get('analytics')
  @ApiOperation({
    summary: 'Números do quiz',
    description:
      'Totais, países de origem, idiomas, respostas por pergunta e linha do ' +
      'tempo. O país vem do cabeçalho da Cloudflare; o endereço IP não é ' +
      'guardado, por isso não aparece aqui.',
  })
  @ApiOkResponse({ type: QuizAnalyticsResponseDto })
  analytics(
    @Query() query: QuizAnalyticsQueryDto,
  ): Promise<QuizAnalyticsResponseDto> {
    return this.service.getAnalytics(query);
  }

  @Get('submissions')
  @ApiOperation({
    summary: 'Submissões, uma a uma',
    description:
      'Mais recente primeiro, com as respostas de cada uma. `country=unknown` ' +
      'traz as submissões sem país.',
  })
  @ApiOkResponse({ type: PaginatedQuizSubmissionsResponseDto })
  submissions(
    @Query() query: ListQuizSubmissionsQueryDto,
  ): Promise<PaginatedQuizSubmissionsResponseDto> {
    return this.service.listSubmissions(query);
  }
}
