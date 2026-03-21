import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  Session,
  AllowAnonymous,
  type UserSession,
} from '@thallesp/nestjs-better-auth';
import {
  ApiCookieAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { ProfessionalProfileService } from './professional-profile.service';
import { UpsertProfessionalProfileDto } from './dto/upsert-professional-profile.dto';
import { ProfessionalProfileResponseDto } from './dto/professional-profile-response.dto';

@ApiTags('Professional Profile')
@Controller('professional-profile')
export class ProfessionalProfileController {
  constructor(private readonly service: ProfessionalProfileService) {}

  @Get('me')
  @ApiCookieAuth('better-auth.session_token')
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  @ApiOperation({ summary: 'Buscar próprio perfil profissional' })
  @ApiOkResponse({ type: ProfessionalProfileResponseDto })
  getMyProfile(@Session() session: UserSession) {
    return this.service.getMyProfile(session.user.id);
  }

  @Put('me')
  @HttpCode(HttpStatus.OK)
  @Roles(UserRole.USER)
  @ApiCookieAuth('better-auth.session_token')
  @ApiUnauthorizedResponse({ description: 'Autenticação necessária' })
  @ApiOperation({ summary: 'Criar ou atualizar perfil profissional' })
  @ApiOkResponse({ type: ProfessionalProfileResponseDto })
  upsertProfile(
    @Body() dto: UpsertProfessionalProfileDto,
    @Session() session: UserSession,
  ) {
    return this.service.upsertProfile(session.user.id, dto);
  }

  @Get(':userId')
  @AllowAnonymous()
  @ApiOperation({ summary: 'Buscar perfil profissional público por userId' })
  @ApiParam({ name: 'userId', description: 'ID do usuário' })
  @ApiOkResponse({ type: ProfessionalProfileResponseDto })
  @ApiNotFoundResponse({ description: 'Perfil não encontrado ou privado' })
  getPublicProfile(@Param('userId') userId: string) {
    return this.service.getPublicProfile(userId);
  }
}
