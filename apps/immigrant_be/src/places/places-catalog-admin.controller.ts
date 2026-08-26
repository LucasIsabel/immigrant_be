import {
  Body,
  Controller,
  Delete,
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
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { AdminPlaceResponseDto } from './dto/city-ingestion-response.dto';
import { ListCatalogPlacesQueryDto } from './dto/list-catalog-places-query.dto';
import { PaginatedCatalogPlacesResponseDto } from './dto/catalog-places-response.dto';
import { UpdateCatalogPlaceDto } from './dto/update-catalog-place.dto';
import { PlacesCatalogAdminService } from './places-catalog-admin.service';

/**
 * The live catalogue, as opposed to the ingestion flow one path deeper.
 *
 * Routing note: this controller sits at `admin/places` while the ingestion one
 * sits at `admin/places/ingestions`. The ingestion controller is registered
 * first in the module, so its exact paths win; this one deliberately has no
 * bare `GET :id` — the list carries everything the screen needs, and a loose
 * `:id` at this root would be one registration-order mistake away from
 * swallowing `/ingestions`.
 *
 * Every response is a named class in `@ApiResponse({ type })` — the contract
 * spec fails the build otherwise.
 */
@ApiTags('Admin — Places Catalog')
@Controller('admin/places')
@Roles(UserRole.ADMIN)
@ApiCookieAuth('better-auth.session_token')
@ApiUnauthorizedResponse({ description: 'Authentication required' })
@ApiForbiddenResponse({ description: 'Insufficient access' })
export class PlacesCatalogAdminController {
  constructor(private readonly service: PlacesCatalogAdminService) {}

  @Get()
  @ApiOperation({
    summary: 'List every place — curated and ingested, active or not',
  })
  @ApiOkResponse({ type: PaginatedCatalogPlacesResponseDto })
  list(
    @Query() query: ListCatalogPlacesQueryDto,
  ): Promise<PaginatedCatalogPlacesResponseDto> {
    return this.service.list(query);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Edit a live place, whatever its review status',
  })
  @ApiOkResponse({ type: AdminPlaceResponseDto })
  @ApiNotFoundResponse({ description: 'Place not found' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateCatalogPlaceDto,
  ): Promise<AdminPlaceResponseDto> {
    return this.service.update(id, dto);
  }

  @Post(':id/activate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Put the place back on the public explorer' })
  @ApiOkResponse({ type: AdminPlaceResponseDto })
  @ApiNotFoundResponse({ description: 'Place not found' })
  activate(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<AdminPlaceResponseDto> {
    return this.service.setActive(id, true);
  }

  @Post(':id/deactivate')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary:
      'Hide the place from the public explorer, keeping its data recoverable',
  })
  @ApiOkResponse({ type: AdminPlaceResponseDto })
  @ApiNotFoundResponse({ description: 'Place not found' })
  deactivate(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<AdminPlaceResponseDto> {
    return this.service.setActive(id, false);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Hard delete, for records that should never have existed',
  })
  @ApiNoContentResponse({ description: 'Place removed' })
  @ApiNotFoundResponse({ description: 'Place not found' })
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.service.remove(id);
  }
}
