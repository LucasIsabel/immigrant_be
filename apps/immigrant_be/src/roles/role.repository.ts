import { PrismaService } from '@app/database';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleRepository {
  constructor(private readonly prisma: PrismaService) {}

  // ── Role CRUD ──────────────────────────────────────────────

  async create(data: { name: string; description?: string }) {
    return this.prisma.roles.create({ data });
  }

  async findAll() {
    return this.prisma.roles.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async findById(id: string) {
    return this.prisma.roles.findUnique({ where: { id } });
  }

  async findByName(name: string) {
    return this.prisma.roles.findUnique({ where: { name } });
  }

  async update(id: string, data: { name?: string; description?: string }) {
    return this.prisma.roles.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.roles.delete({ where: { id } });
  }

  // ── User-Role Assignment ───────────────────────────────────

  async assignRole(userId: string, roleId: string) {
    return this.prisma.userRoles.create({
      data: { userId, roleId },
      include: { role: true },
    });
  }

  async revokeRole(userId: string, roleId: string) {
    return this.prisma.userRoles.delete({
      where: { userId_roleId: { userId, roleId } },
    });
  }

  async findUserRoles(userId: string) {
    return this.prisma.userRoles.findMany({
      where: { userId },
      include: { role: true },
    });
  }

  async countUserRoles(userId: string) {
    return this.prisma.userRoles.count({ where: { userId } });
  }
}
