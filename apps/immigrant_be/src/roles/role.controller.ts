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
} from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleResponseDto } from './dto/role-response.dto';
import { AssignRoleDto } from './dto/assign-role.dto';
import { RevokeRoleDto } from './dto/revoke-role.dto';
import { UserRoleResponseDto } from './dto/user-role-response.dto';

@ApiTags('Roles')
@Roles(UserRole.ADMIN)
@ApiCookieAuth('better-auth.session_token')
@ApiUnauthorizedResponse({ description: 'Authentication required' })
@ApiForbiddenResponse({ description: 'Admin role required' })
@Controller('admin/roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // ── Role CRUD ──────────────────────────────────────────────

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new role' })
  @ApiBody({ type: CreateRoleDto })
  @ApiCreatedResponse({
    description: 'Role created successfully',
    type: RoleResponseDto,
  })
  @ApiConflictResponse({ description: 'Role name already exists' })
  create(@Body() dto: CreateRoleDto) {
    return this.roleService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'List all roles' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Roles retrieved successfully',
    type: [RoleResponseDto],
  })
  findAll() {
    return this.roleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a role by ID' })
  @ApiParam({
    name: 'id',
    description: 'Role ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Role found successfully',
    type: RoleResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Role not found' })
  findById(@Param('id') id: string) {
    return this.roleService.findById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a role' })
  @ApiParam({
    name: 'id',
    description: 'Role ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @ApiBody({ type: UpdateRoleDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Role updated successfully',
    type: RoleResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Role not found' })
  @ApiConflictResponse({ description: 'Role name already exists' })
  update(@Param('id') id: string, @Body() dto: UpdateRoleDto) {
    return this.roleService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a role' })
  @ApiParam({
    name: 'id',
    description: 'Role ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @ApiNoContentResponse({ description: 'Role deleted successfully' })
  @ApiNotFoundResponse({ description: 'Role not found' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Cannot delete protected role',
  })
  remove(@Param('id') id: string) {
    return this.roleService.delete(id);
  }

  // ── User-Role Assignment ───────────────────────────────────

  @Post('assign')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Assign a role to a user' })
  @ApiBody({ type: AssignRoleDto })
  @ApiCreatedResponse({
    description: 'Role assigned successfully',
    type: UserRoleResponseDto,
  })
  @ApiNotFoundResponse({ description: 'User or role not found' })
  @ApiConflictResponse({ description: 'User already has this role' })
  assignRole(@Body() dto: AssignRoleDto) {
    return this.roleService.assignRole(dto.userId, dto.roleId);
  }

  @Delete('revoke')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Revoke a role from a user' })
  @ApiBody({ type: RevokeRoleDto })
  @ApiNoContentResponse({ description: 'Role revoked successfully' })
  @ApiNotFoundResponse({ description: 'User-role assignment not found' })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Cannot revoke the last role from a user',
  })
  revokeRole(@Body() dto: RevokeRoleDto) {
    return this.roleService.revokeRole(dto.userId, dto.roleId);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all roles for a user' })
  @ApiParam({
    name: 'userId',
    description: 'User ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User roles retrieved successfully',
    type: [UserRoleResponseDto],
  })
  findUserRoles(@Param('userId') userId: string) {
    return this.roleService.findUserRoles(userId);
  }
}
