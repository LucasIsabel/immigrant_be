import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '@app/database';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '../enums/user-role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const session = request.session;

    if (!session?.user?.id) {
      throw new UnauthorizedException('Authentication required');
    }

    const user = await this.prisma.users.findUnique({
      where: { id: session.user.id },
      select: { userRoles: { select: { role: { select: { name: true } } } } },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const userRoleNames = user.userRoles.map(
      (userRole) => userRole.role.name,
    );

    const hasRole = requiredRoles.some((role) =>
      userRoleNames.includes(role),
    );

    if (!hasRole) {
      throw new ForbiddenException(
        `Insufficient permissions. Required: ${requiredRoles.join(' or ')}`,
      );
    }

    return true;
  }
}
