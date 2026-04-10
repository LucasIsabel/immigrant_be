import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiCookieAuth,
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
import type { TourGuideReviewsListDto } from './dto/tour-guide-review-response.dto';

@ApiTags('Tour Guide Reviews')
@Controller('tour-guide-reviews')
export class TourGuideReviewsController {
  constructor(private readonly service: TourGuideReviewsService) {}

  @Get(':businessId')
  @AllowAnonymous()
  @ApiOperation({ summary: 'Listar avaliações de um guia turístico' })
  @ApiParam({ name: 'businessId', description: 'UUID do negócio' })
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
  createReview(
    @Param('businessId') businessId: string,
    @Session() session: UserSession,
    @Body() dto: CreateTourGuideReviewDto,
  ) {
    return this.service.createReview(businessId, session.user.id, dto);
  }
}
