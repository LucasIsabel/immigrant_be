import {
  Body,
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
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { TourGuideReviewsService } from './tour-guide-reviews.service';
import {
  AdminTourGuideReviewDetailDto,
  AdminTourGuideReviewDto,
  DeleteTourGuideReviewDto,
  HideTourGuideReviewDto,
  ListAdminTourGuideReviewsQueryDto,
  PaginatedAdminTourGuideReviewsResponseDto,
} from './dto/admin-tour-guide-review.dto';

/**
 * Until now a review could only be removed through the database. A guide
 * accused of something in a review had nowhere to turn, and neither did an
 * admin.
 */
@ApiTags('Admin — Tour Guide Reviews')
@Controller('admin/tour-guide-reviews')
@Roles(UserRole.ADMIN)
@ApiCookieAuth('better-auth.session_token')
@ApiUnauthorizedResponse({ description: 'Sessão ausente ou inválida' })
@ApiForbiddenResponse({ description: 'Apenas administradores' })
export class TourGuideReviewsAdminController {
  constructor(private readonly service: TourGuideReviewsService) {}

  @Get()
  @ApiOperation({ summary: 'Listar avaliações, incluindo as ocultas' })
  @ApiOkResponse({ type: PaginatedAdminTourGuideReviewsResponseDto })
  list(
    @Query() query: ListAdminTourGuideReviewsQueryDto,
  ): Promise<PaginatedAdminTourGuideReviewsResponseDto> {
    return this.service.listForAdmin(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detalhe de uma avaliação, com as denúncias' })
  @ApiParam({ name: 'id', description: 'UUID da avaliação' })
  @ApiOkResponse({ type: AdminTourGuideReviewDetailDto })
  @ApiNotFoundResponse({ description: 'Avaliação não encontrada' })
  get(@Param('id') id: string): Promise<AdminTourGuideReviewDetailDto> {
    return this.service.getForAdmin(id);
  }

  @Post(':id/hide')
  @ApiOperation({
    summary: 'Ocultar uma avaliação',
    description:
      'Some da listagem pública e da média. O motivo fica gravado e a ação é reversível.',
  })
  @ApiParam({ name: 'id', description: 'UUID da avaliação' })
  @ApiOkResponse({ type: AdminTourGuideReviewDto })
  @ApiNotFoundResponse({ description: 'Avaliação não encontrada' })
  @ApiConflictResponse({ description: 'Avaliação já está oculta' })
  hide(
    @Param('id') id: string,
    @Session() session: UserSession,
    @Body() dto: HideTourGuideReviewDto,
  ): Promise<AdminTourGuideReviewDto> {
    return this.service.hide(id, session.user.id, dto);
  }

  @Post(':id/unhide')
  @ApiOperation({ summary: 'Voltar a exibir uma avaliação oculta' })
  @ApiParam({ name: 'id', description: 'UUID da avaliação' })
  @ApiOkResponse({ type: AdminTourGuideReviewDto })
  @ApiNotFoundResponse({ description: 'Avaliação não encontrada' })
  @ApiConflictResponse({ description: 'Avaliação não está oculta' })
  unhide(@Param('id') id: string): Promise<AdminTourGuideReviewDto> {
    return this.service.unhide(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Apagar uma avaliação em definitivo',
    description:
      'Para conteúdo que não pode ficar guardado. Irreversível: prefira ocultar.',
  })
  @ApiParam({ name: 'id', description: 'UUID da avaliação' })
  @ApiNoContentResponse({ description: 'Avaliação apagada' })
  @ApiNotFoundResponse({ description: 'Avaliação não encontrada' })
  remove(
    @Param('id') id: string,
    @Session() session: UserSession,
    @Body() dto: DeleteTourGuideReviewDto,
  ): Promise<void> {
    return this.service.remove(id, session.user.id, dto);
  }
}
