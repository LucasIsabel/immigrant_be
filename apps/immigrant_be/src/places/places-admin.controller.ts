import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiConflictResponse,
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import {
  AdminPlaceResponseDto,
  CityIngestionDetailResponseDto,
  CityIngestionResponseDto,
  PaginatedCityIngestionsResponseDto,
} from './dto/city-ingestion-response.dto';
import { CreateCityIngestionDto } from './dto/create-city-ingestion.dto';
import { ListCityIngestionsQueryDto } from './dto/list-city-ingestions-query.dto';
import {
  RejectCityIngestionDto,
  RejectPlaceDto,
} from './dto/reject-city-ingestion.dto';
import { UpdateIngestedPlaceDto } from './dto/update-ingested-place.dto';
import { PlacesAdminService } from './places-admin.service';

/**
 * Every response is declared as a named class in `@ApiResponse({ type })`.
 *
 * That declaration is what becomes a type on the frontend: an inline schema
 * generates nothing usable, and a `$ref` inside one would need
 * `@ApiExtraModels`. It cost two PRs of rework in #132/#133.
 */
@ApiTags('Admin — Places Ingestion')
@Controller('admin/places/ingestions')
@Roles(UserRole.ADMIN)
@ApiCookieAuth('better-auth.session_token')
@ApiUnauthorizedResponse({ description: 'Authentication required' })
@ApiForbiddenResponse({ description: 'Insufficient access' })
export class PlacesAdminController {
  constructor(private readonly service: PlacesAdminService) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Trigger the place ingestion for a city' })
  @ApiAcceptedResponse({
    description: 'Ingestion created and queued',
    type: CityIngestionResponseDto,
  })
  @ApiConflictResponse({
    description: 'An active ingestion for this city already exists',
  })
  create(
    @Body() dto: CreateCityIngestionDto,
    @Session() session: UserSession,
  ): Promise<CityIngestionResponseDto> {
    return this.service.createIngestion(dto, session.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'List ingestions, filtered by status' })
  @ApiOkResponse({ type: PaginatedCityIngestionsResponseDto })
  list(
    @Query() query: ListCityIngestionsQueryDto,
  ): Promise<PaginatedCityIngestionsResponseDto> {
    return this.service.listIngestions(query);
  }

  @Get(':id')
  @ApiOperation({
    summary:
      'Ingestion detail — places, translations, provenance and conflicts',
  })
  @ApiOkResponse({ type: CityIngestionDetailResponseDto })
  @ApiNotFoundResponse({ description: 'Ingestion not found' })
  @ApiParam({ name: 'id', description: 'Ingestion UUID' })
  detail(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<CityIngestionDetailResponseDto> {
    return this.service.getIngestion(id);
  }

  @Patch(':id/places/:placeId')
  @ApiOperation({ summary: 'Edit a place while it is a draft' })
  @ApiOkResponse({ type: AdminPlaceResponseDto })
  @ApiNotFoundResponse({ description: 'Place not found in this ingestion' })
  @ApiConflictResponse({ description: 'The place is no longer a draft' })
  updatePlace(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('placeId', ParseUUIDPipe) placeId: string,
    @Body() dto: UpdateIngestedPlaceDto,
  ): Promise<AdminPlaceResponseDto> {
    return this.service.updatePlace(id, placeId, dto);
  }

  @Post(':id/places/:placeId/reject')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Reject a place — it does not come back on reprocessing',
  })
  @ApiOkResponse({ type: AdminPlaceResponseDto })
  @ApiNotFoundResponse({ description: 'Place not found in this ingestion' })
  rejectPlace(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('placeId', ParseUUIDPipe) placeId: string,
    @Body() dto: RejectPlaceDto,
  ): Promise<AdminPlaceResponseDto> {
    return this.service.rejectPlace(id, placeId, dto.reason);
  }

  @Post(':id/places/:placeId/retry-texts')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Re-queue the text writing for one place' })
  @ApiAcceptedResponse({ description: 'Job queued' })
  @ApiNotFoundResponse({ description: 'Place not found in this ingestion' })
  retryTexts(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('placeId', ParseUUIDPipe) placeId: string,
  ): Promise<void> {
    return this.service.retryPlaceTexts(id, placeId);
  }

  @Post(':id/approve')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Approve the city — publishes every draft at once',
  })
  @ApiOkResponse({ type: CityIngestionResponseDto })
  @ApiNotFoundResponse({ description: 'Ingestion not found' })
  @ApiConflictResponse({ description: 'The city is not ready for review' })
  @ApiUnprocessableEntityResponse({
    description:
      'Some places lack all three translations — the response lists them',
  })
  approve(
    @Param('id', ParseUUIDPipe) id: string,
    @Session() session: UserSession,
  ): Promise<CityIngestionResponseDto> {
    return this.service.approve(id, session.user.id);
  }

  @Post(':id/reject')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Reject the whole city' })
  @ApiOkResponse({ type: CityIngestionResponseDto })
  @ApiNotFoundResponse({ description: 'Ingestion not found' })
  @ApiConflictResponse({ description: 'The city is not ready for review' })
  reject(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: RejectCityIngestionDto,
    @Session() session: UserSession,
  ): Promise<CityIngestionResponseDto> {
    return this.service.reject(id, session.user.id, dto.reason);
  }

  @Post(':id/retry')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Reprocess an ingestion that failed' })
  @ApiAcceptedResponse({ type: CityIngestionResponseDto })
  @ApiNotFoundResponse({ description: 'Ingestion not found' })
  @ApiConflictResponse({ description: 'The ingestion is not in FAILED' })
  retry(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<CityIngestionResponseDto> {
    return this.service.retry(id);
  }
}
