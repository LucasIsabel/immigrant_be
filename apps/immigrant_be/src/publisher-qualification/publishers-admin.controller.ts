import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Session, type UserSession } from '@thallesp/nestjs-better-auth';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { PublisherQualificationService } from './publisher-qualification.service';
import { ApplyOverrideDto } from './dto/apply-override.dto';

@ApiTags('Admin — Publishers')
@Controller('admin/publishers')
@Roles(UserRole.ADMIN)
@ApiCookieAuth('better-auth.session_token')
export class PublishersAdminController {
  constructor(private readonly service: PublisherQualificationService) {}

  @Get()
  @ApiOperation({ summary: 'Listar qualificações de publishers' })
  @ApiOkResponse({ description: 'Lista de publishers com critérios' })
  listAll() {
    return this.service.listAll();
  }

  @Get(':businessId')
  @ApiOperation({ summary: 'Detalhe de um publisher' })
  @ApiOkResponse({ description: 'Publisher com critérios' })
  @ApiNotFoundResponse({ description: 'Publisher não encontrado' })
  @ApiParam({ name: 'businessId', description: 'UUID do Business' })
  findOne(@Param('businessId') businessId: string) {
    return this.service.findOne(businessId);
  }

  @Post(':businessId/override')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Aplicar override de qualificação' })
  @ApiOkResponse({ description: 'Override aplicado' })
  @ApiNotFoundResponse({ description: 'Publisher não encontrado' })
  @ApiParam({ name: 'businessId', description: 'UUID do Business' })
  applyOverride(
    @Param('businessId') businessId: string,
    @Body() dto: ApplyOverrideDto,
    @Session() session: UserSession,
  ) {
    return this.service.applyOverride(businessId, session.user.id, dto);
  }

  @Delete(':businessId/override')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Remover override de qualificação' })
  @ApiOkResponse({
    description: 'Override removido, critérios automáticos restaurados',
  })
  @ApiNotFoundResponse({ description: 'Publisher não encontrado' })
  @ApiParam({ name: 'businessId', description: 'UUID do Business' })
  removeOverride(@Param('businessId') businessId: string) {
    return this.service.removeOverride(businessId);
  }
}
