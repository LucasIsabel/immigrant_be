import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCookieAuth,
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
import { ItinerariesService } from './itineraries.service';
import { ListReportedItinerariesQueryDto } from './dto/list-reported-itineraries-query.dto';
import {
  DismissReportsResponseDto,
  PaginatedReportedItinerariesResponseDto,
} from './dto/reported-itinerary.dto';
import { MyItineraryResponseDto } from './dto/itinerary-response.dto';

/**
 * What an admin can do about a reported itinerary, which until now was
 * nothing: reports were written and never read once.
 *
 * A controller of its own rather than admin branches on the owner's routes.
 * `@Roles(ADMIN)` on the class is a single fact about every route in the file,
 * and the owner's `PATCH /itineraries/:id/visibility` keeps meaning exactly
 * what it says — an owner changing their own mind — instead of growing a
 * bypass that has to be read carefully to be trusted.
 */
@ApiTags('Admin — Itineraries')
@Controller('admin/itineraries')
@Roles(UserRole.ADMIN)
@ApiCookieAuth('better-auth.session_token')
@ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
@ApiForbiddenResponse({ description: 'Acesso insuficiente' })
export class ItinerariesAdminController {
  constructor(private readonly service: ItinerariesService) {}

  @Get('reported')
  @ApiOperation({
    summary: 'Roteiros denunciados à espera de decisão',
    description:
      'Só os públicos com pelo menos uma denúncia por responder, mais denunciados primeiro. Um roteiro já despublicado não está à espera de nada e sai da fila.',
  })
  @ApiOkResponse({ type: PaginatedReportedItinerariesResponseDto })
  listReported(
    @Query() query: ListReportedItinerariesQueryDto,
  ): Promise<PaginatedReportedItinerariesResponseDto> {
    return this.service.listReported(query);
  }

  @Post(':id/unpublish')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Tirar o roteiro de público',
    description:
      'O dono continua com ele; deixa de aparecer na listagem pública. As cópias que outras pessoas já fizeram não são afectadas — cada uma tem as suas próprias paradas. Responde também às denúncias abertas: agir sobre uma é respondê-la.',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ type: MyItineraryResponseDto })
  @ApiNotFoundResponse({ description: 'Roteiro não encontrado' })
  unpublish(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<MyItineraryResponseDto> {
    return this.service.unpublish(id);
  }

  @Post(':id/dismiss-reports')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Dizer que as denúncias não procedem',
    description:
      'O roteiro fica onde está e sai da fila. Sem isto, uma denúncia de má-fé mantinha um roteiro legítimo listado para sempre — e uma fila que não se esvazia é uma fila que ninguém lê.',
  })
  @ApiParam({ name: 'id', format: 'uuid' })
  @ApiOkResponse({ type: DismissReportsResponseDto })
  @ApiNotFoundResponse({ description: 'Roteiro não encontrado' })
  dismissReports(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<DismissReportsResponseDto> {
    return this.service.dismissReports(id);
  }
}
