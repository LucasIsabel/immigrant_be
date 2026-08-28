import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import {
  ApiConflictResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  AllowAnonymous,
  Session,
  type UserSession,
} from '@thallesp/nestjs-better-auth';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { TourGuideReviewsService } from './tour-guide-reviews.service';
import { CreateTourGuideReviewDto } from './dto/create-tour-guide-review.dto';
import {
  ReportTourGuideReviewDto,
  ReportTourGuideReviewResponseDto,
} from './dto/report-tour-guide-review.dto';
import {
  TourGuideReviewDto,
  TourGuideReviewsListDto,
} from './dto/tour-guide-review-response.dto';

@ApiTags('Tour Guide Reviews')
@Controller('tour-guide-reviews')
export class TourGuideReviewsController {
  constructor(private readonly service: TourGuideReviewsService) {}

  @Get(':businessId')
  @AllowAnonymous()
  @ApiOperation({ summary: 'Listar avaliações de um guia turístico' })
  @ApiParam({ name: 'businessId', description: 'UUID do negócio' })
  @ApiOkResponse({ type: TourGuideReviewsListDto })
  listReviews(
    @Param('businessId') businessId: string,
  ): Promise<TourGuideReviewsListDto> {
    return this.service.listReviews(businessId);
  }

  @Post(':businessId')
  @Roles(UserRole.USER)
  @ApiCookieAuth('better-auth.session_token')
  @ApiOperation({ summary: 'Avaliar um guia turístico (requer autenticação)' })
  @ApiParam({ name: 'businessId', description: 'UUID do negócio' })
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ type: TourGuideReviewDto })
  @ApiNotFoundResponse({ description: 'Guia turístico não encontrado' })
  @ApiForbiddenResponse({ description: 'O dono não avalia o próprio negócio' })
  @ApiConflictResponse({ description: 'O utilizador já avaliou este guia' })
  createReview(
    @Param('businessId') businessId: string,
    @Session() session: UserSession,
    @Body() dto: CreateTourGuideReviewDto,
  ): Promise<TourGuideReviewDto> {
    return this.service.createReview(businessId, session.user.id, dto);
  }

  /**
   * Anonymous on purpose, like the community event report: whoever is reading
   * a guide's page is not logged in, and asking them to sign up before they
   * can flag defamation is how the flag never arrives. The honeypot and a
   * tight throttle carry the abuse load.
   */
  @Post(':reviewId/report')
  @AllowAnonymous()
  @Throttle({ default: { ttl: 60_000, limit: 5 } })
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Denunciar uma avaliação' })
  @ApiParam({ name: 'reviewId', description: 'UUID da avaliação' })
  @ApiCreatedResponse({ type: ReportTourGuideReviewResponseDto })
  @ApiNotFoundResponse({ description: 'Avaliação não encontrada' })
  report(
    @Param('reviewId') reviewId: string,
    @Body() dto: ReportTourGuideReviewDto,
  ): Promise<ReportTourGuideReviewResponseDto> {
    return this.service.report(reviewId, dto);
  }
}
