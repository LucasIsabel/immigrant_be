import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Session } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { type UserSession } from '@thallesp/nestjs-better-auth';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { UserService } from './user.service';
import { AdminUserResponseDto } from './dto/admin-user-response.dto';
import { PaginatedUsersResponseDto } from './dto/paginated-users-response.dto';
import { ListUsersQueryDto } from './dto/list-users-query.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { UserSessionResponseDto } from './dto/user-session-response.dto';

@ApiTags('Admin Users')
@Roles(UserRole.ADMIN)
@ApiCookieAuth('better-auth.session_token')
@ApiUnauthorizedResponse({ description: 'Authentication required' })
@ApiForbiddenResponse({ description: 'Admin role required' })
@Controller('admin/users')
export class AdminUserController {
  constructor(private readonly userService: UserService) {}

  // ── Create ────────────────────────────────────────────────

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a user manually (admin)' })
  @ApiBody({ type: CreateAdminUserDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created successfully',
    type: AdminUserResponseDto,
  })
  @ApiConflictResponse({ description: 'Email already in use' })
  @ApiNotFoundResponse({ description: 'Default role "user" not found' })
  createUser(@Body() dto: CreateAdminUserDto) {
    return this.userService.createAdminUser(dto);
  }

  // ── List & Read ───────────────────────────────────────────

  @Get()
  @ApiOperation({ summary: 'List all users (paginated)' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Users retrieved successfully',
    type: PaginatedUsersResponseDto,
  })
  findAll(@Query() query: ListUsersQueryDto) {
    return this.userService.findAllUsers(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by ID' })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User found successfully',
    type: AdminUserResponseDto,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  findById(@Param('id') id: string) {
    return this.userService.findUserByIdAdmin(id);
  }

  // ── Update & Delete ───────────────────────────────────────

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated successfully',
    type: AdminUserResponseDto,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiConflictResponse({ description: 'Email already in use' })
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a user' })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @ApiNoContentResponse({ description: 'User deleted successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBadRequestResponse({ description: 'Cannot delete your own account' })
  remove(@Session() session: UserSession, @Param('id') id: string) {
    return this.userService.deleteUser(id, session.user.id);
  }

  // ── Activate / Deactivate ─────────────────────────────────

  @Patch(':id/activate')
  @ApiOperation({ summary: 'Activate a user account' })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User activated successfully',
    type: AdminUserResponseDto,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiConflictResponse({ description: 'User is already active' })
  activate(@Param('id') id: string) {
    return this.userService.activateUser(id);
  }

  @Patch(':id/deactivate')
  @ApiOperation({ summary: 'Deactivate a user account' })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User deactivated successfully',
    type: AdminUserResponseDto,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiConflictResponse({ description: 'User is already inactive' })
  deactivate(@Param('id') id: string) {
    return this.userService.deactivateUser(id);
  }

  // ── Ban / Unban ───────────────────────────────────────────

  // Nenhum recurso é criado aqui, então o 201 padrão do POST no Nest nunca foi
  // o código certo — e a doc já prometia 200. Sem isto o servidor responde
  // 201 enquanto o contrato diz 200, e o cliente gerado tipa sobre um código
  // que nunca chega.
  @HttpCode(HttpStatus.OK)
  @Post(':id/ban')
  @ApiOperation({ summary: 'Ban a user' })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @ApiBody({ type: BanUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User banned successfully',
    type: AdminUserResponseDto,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiConflictResponse({ description: 'User is already banned' })
  @ApiBadRequestResponse({ description: 'Cannot ban your own account' })
  ban(
    @Session() session: UserSession,
    @Param('id') id: string,
    @Body() dto: BanUserDto,
  ) {
    return this.userService.banUser(id, dto, session.user.id);
  }

  // Nenhum recurso é criado aqui, então o 201 padrão do POST no Nest nunca foi
  // o código certo — e a doc já prometia 200. Sem isto o servidor responde
  // 201 enquanto o contrato diz 200, e o cliente gerado tipa sobre um código
  // que nunca chega.
  @HttpCode(HttpStatus.OK)
  @Post(':id/unban')
  @ApiOperation({ summary: 'Unban a user' })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User unbanned successfully',
    type: AdminUserResponseDto,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiConflictResponse({ description: 'User is not banned' })
  unban(@Param('id') id: string) {
    return this.userService.unbanUser(id);
  }

  // ── Email Verification ────────────────────────────────────

  @Patch(':id/verify-email')
  @ApiOperation({ summary: 'Mark user email as verified' })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Email verified successfully',
    type: AdminUserResponseDto,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiConflictResponse({ description: 'Email is already verified' })
  verifyEmail(@Param('id') id: string) {
    return this.userService.verifyUserEmail(id, true);
  }

  @Patch(':id/unverify-email')
  @ApiOperation({ summary: 'Mark user email as unverified' })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Email unverified successfully',
    type: AdminUserResponseDto,
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiConflictResponse({ description: 'Email is already unverified' })
  unverifyEmail(@Param('id') id: string) {
    return this.userService.verifyUserEmail(id, false);
  }

  // ── Sessions ──────────────────────────────────────────────

  @Get(':id/sessions')
  @ApiOperation({ summary: 'List active sessions of a user' })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Sessions retrieved successfully',
    type: [UserSessionResponseDto],
  })
  @ApiNotFoundResponse({ description: 'User not found' })
  getSessions(@Param('id') id: string) {
    return this.userService.getUserSessions(id);
  }

  @Delete(':id/sessions')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Revoke all sessions of a user (forced logout)' })
  @ApiParam({
    name: 'id',
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @ApiNoContentResponse({ description: 'Sessions revoked successfully' })
  @ApiNotFoundResponse({ description: 'User not found' })
  revokeSessions(@Param('id') id: string) {
    return this.userService.revokeUserSessions(id);
  }
}
