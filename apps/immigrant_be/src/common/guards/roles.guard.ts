import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from '@app/database';
import { auth } from '@app/config/auth';
import { isBanActive } from '@app/config/ban';
import { fromNodeHeaders } from 'better-auth/node';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { UserRole } from '../enums/user-role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const handlerRoles = this.reflector.get<UserRole[]>(
      ROLES_KEY,
      context.getHandler(),
    );
    const classRoles = this.reflector.get<UserRole[]>(
      ROLES_KEY,
      context.getClass(),
    );

    const requiredRoles = handlerRoles ?? classRoles;

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    // Get session from request (set by AuthGuard) or fetch it directly
    const session = request.session?.user?.id
      ? request.session
      : await auth.api.getSession({
          headers: fromNodeHeaders(request.headers),
        });

    if (!session?.user?.id) {
      throw new UnauthorizedException('Authentication required');
    }

    const user = await this.prisma.users.findUnique({
      where: { id: session.user.id },
      select: {
        banned: true,
        banExpires: true,
        userRoles: { select: { role: { select: { name: true } } } },
      },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    /*
     * The lock behind the door. Sign-in already refuses a banned account and
     * banning already deletes that person's sessions, so reaching here with a
     * ban in force means a session was minted some other way — a ban written
     * straight to the database, a path added later that forgets to revoke.
     *
     * It costs two columns on a query this guard already makes, and it is the
     * difference between a ban that holds and one that holds until somebody
     * writes the next endpoint.
     */
    if (isBanActive(user)) {
      throw new ForbiddenException('Esta conta está suspensa.');
    }

    const userRoleNames = user.userRoles.map((userRole) => userRole.role.name);

    const hasRole = requiredRoles.some((role) => userRoleNames.includes(role));

    if (!hasRole) {
      throw new ForbiddenException(
        `Insufficient permissions. Required: ${requiredRoles.join(' or ')}`,
      );
    }

    return true;
  }
}
