import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(private readonly roleRepository: RoleRepository) {}

  // ── Role CRUD ──────────────────────────────────────────────

  async create(dto: CreateRoleDto) {
    const existing = await this.roleRepository.findByName(dto.name);

    if (existing) {
      throw new ConflictException(`Role "${dto.name}" already exists`);
    }

    return this.roleRepository.create(dto);
  }

  async findAll() {
    return this.roleRepository.findAll();
  }

  async findById(id: string) {
    const role = await this.roleRepository.findById(id);

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    return role;
  }

  async update(id: string, dto: UpdateRoleDto) {
    const role = await this.roleRepository.findById(id);

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    if (dto.name && dto.name !== role.name) {
      const existing = await this.roleRepository.findByName(dto.name);

      if (existing) {
        throw new ConflictException(`Role "${dto.name}" already exists`);
      }
    }

    return this.roleRepository.update(id, dto);
  }

  async delete(id: string) {
    const role = await this.roleRepository.findById(id);

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    const protectedRoles = ['user', 'admin'];

    if (protectedRoles.includes(role.name)) {
      throw new BadRequestException(
        `Cannot delete protected role "${role.name}"`,
      );
    }

    return this.roleRepository.delete(id);
  }

  // ── User-Role Assignment ───────────────────────────────────

  async assignRole(userId: string, roleId: string) {
    const role = await this.roleRepository.findById(roleId);

    if (!role) {
      throw new NotFoundException('Role not found');
    }

    try {
      return await this.roleRepository.assignRole(userId, roleId);
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        'code' in error &&
        (error as { code: string }).code === 'P2002'
      ) {
        throw new ConflictException('User already has this role');
      }

      if (
        error instanceof Error &&
        'code' in error &&
        (error as { code: string }).code === 'P2003'
      ) {
        throw new NotFoundException('User not found');
      }

      throw error;
    }
  }

  async revokeRole(userId: string, roleId: string) {
    const count = await this.roleRepository.countUserRoles(userId);

    if (count <= 1) {
      throw new BadRequestException(
        'Cannot revoke the last role from a user',
      );
    }

    try {
      return await this.roleRepository.revokeRole(userId, roleId);
    } catch (error: unknown) {
      if (
        error instanceof Error &&
        'code' in error &&
        (error as { code: string }).code === 'P2025'
      ) {
        throw new NotFoundException('User-role assignment not found');
      }

      throw error;
    }
  }

  async findUserRoles(userId: string) {
    return this.roleRepository.findUserRoles(userId);
  }
}
