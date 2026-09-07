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

  /**
   * Re-stamps the roles onto every live session this person holds.
   *
   * The session carries a `roles` column, written once by the
   * `session.create.before` hook and never touched again — so granting or
   * revoking a role changed the database and left every open tab believing
   * what it believed at sign-in. The backend was never fooled (`RolesGuard`
   * reads the roles fresh on every request), but the screen was: an admin lost
   * the admin menu only when they next signed in, with nothing telling them.
   *
   * Rewriting the sessions is the smaller of the two honest fixes. The other is
   * to stop storing roles on the session at all and read them per request,
   * which is a change to how every page decides what to show.
   */
  async syncSessionRoles(userId: string): Promise<number> {
    const userRoles = await this.prisma.userRoles.findMany({
      where: { userId },
      select: { role: { select: { name: true } } },
    });

    const { count } = await this.prisma.sessions.updateMany({
      where: { userId },
      data: { roles: JSON.stringify(userRoles.map((ur) => ur.role.name)) },
    });

    return count;
  }

  async countUserRoles(userId: string) {
    return this.prisma.userRoles.count({ where: { userId } });
  }
}
