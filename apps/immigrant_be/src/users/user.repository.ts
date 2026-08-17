import { PrismaService } from '@app/database';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { SuggestionItem } from '../system/dto/suggestions.dto';
import { UserSession } from '@thallesp/nestjs-better-auth';
import { ImmigrationVisaType, Plans, Prisma, Users } from 'generated/prisma';
import type { PlanWithRelations } from './utils/formatter';
import { ListUsersQueryDto, UserSortBy } from './dto/list-users-query.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUserPlan({
    user,
    suggestion,
    suggestion_id,
  }: {
    user: UserSession;
    suggestion: SuggestionItem;
    suggestion_id: string | null;
  }): Promise<Plans> {
    return this.prisma.plans.create({
      data: {
        user_id: user.user.id,
        suggestion_id,
        country_id: suggestion.country_id,
        selected_suggestion: JSON.parse(JSON.stringify(suggestion)),
      },
    });
  }

  async getAllUserPlans(user: UserSession): Promise<Plans[]> {
    return this.prisma.plans.findMany({
      where: {
        user_id: user.user.id,
      },
      include: {
        suggestion: true,
        country: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  /**
   * The plan plus everything the response needs, unformatted.
   *
   * Formatting moved to the service because the step text is no longer stored
   * on the plan — it has to be resolved against `visa_steps` in the requested
   * language first, and the repository has no business deciding that.
   */
  async getUserPlanWithRelations(
    user: UserSession,
    plan_id: string,
  ): Promise<{
    data: PlanWithRelations;
    visaTypes: ImmigrationVisaType[];
  } | null> {
    const data = await this.prisma.plans.findUnique({
      where: {
        id: plan_id,
        user_id: user.user.id,
      },
      include: {
        suggestion: true,
        country: true,
        user: true,
        selected_visa_type: true,
      },
    });

    if (!data) {
      return null;
    }

    return { data, visaTypes: await this.getVisaTypes(data.country_id) };
  }

  async getVisaTypes(
    country_id: string | null,
  ): Promise<ImmigrationVisaType[]> {
    if (!country_id) {
      return [];
    }

    return this.prisma.immigrationVisaType.findMany({
      where: {
        country_id: country_id,
      },
    });
  }

  async selectVisaType(
    user: UserSession,
    planId: string,
    visaTypeId: string,
  ): Promise<Plans> {
    // First, verify that the plan belongs to the user
    const plan = await this.prisma.plans.findFirst({
      where: {
        id: planId,
        user_id: user.user.id,
      },
      include: {
        country: true,
      },
    });

    if (!plan) {
      throw new NotFoundException(
        'Plan not found or does not belong to the user',
      );
    }

    // Verify that the visa type exists and belongs to the plan's country
    if (!plan.country_id) {
      throw new BadRequestException('Plan does not have an associated country');
    }

    const visaType = await this.prisma.immigrationVisaType.findFirst({
      where: {
        id: visaTypeId,
        country_id: plan.country_id,
      },
    });

    if (!visaType) {
      throw new BadRequestException(
        'Visa type not found or does not belong to the plan country',
      );
    }

    // Update the plan with the selected visa type
    return this.prisma.plans.update({
      where: {
        id: planId,
      },
      data: {
        selected_visa_type_id: visaTypeId,
      },
    });
  }

  async getVisaStepsByRecommendation(visaTypeId: string, language: string) {
    return this.prisma.visaSteps.findFirst({
      where: {
        visa_type_id: visaTypeId,
        language,
      },
    });
  }

  /**
   * Clears progress when the user picks a different visa type. The step list
   * changes wholesale, so keys from the previous type would be orphans.
   */
  async resetPlanSteps(planId: string) {
    return this.prisma.plans.update({
      where: { id: planId },
      data: { completed_step_keys: [], progress: 0 },
    });
  }

  async updatePlan(planId: string, data: { name: string }) {
    return this.prisma.plans.update({ where: { id: planId }, data });
  }

  async getUserPlanRaw(
    user: UserSession,
    plan_id: string,
  ): Promise<Plans | null> {
    return this.prisma.plans.findUnique({
      where: { id: plan_id, user_id: user.user.id },
    });
  }

  async updateCompletedStepKeys(
    planId: string,
    completed_step_keys: string[],
    progress: number,
  ) {
    return this.prisma.plans.update({
      where: { id: planId },
      data: { completed_step_keys, progress },
    });
  }

  async getUserById(userId: string): Promise<Users | null> {
    const user = await this.prisma.users.findUnique({
      where: { id: userId, emailVerified: true },
    });
    if (!user) {
      return null;
    }
    return user;
  }

  // ── Admin User Management ─────────────────────────────────

  async findAllPaginated(query: ListUsersQueryDto) {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const skip = (page - 1) * limit;

    const where: Prisma.UsersWhereInput = {};

    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { email: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    if (query.isActive !== undefined) {
      where.isActive = query.isActive;
    }

    if (query.banned !== undefined) {
      where.banned = query.banned;
    }

    const sortField = this.mapSortByToField(query.sortBy);

    const [data, total] = await this.prisma.$transaction([
      this.prisma.users.findMany({
        where,
        skip,
        take: limit,
        orderBy: { [sortField]: query.sortDirection ?? 'desc' },
        include: {
          userRoles: {
            include: {
              role: true,
            },
          },
        },
      }),
      this.prisma.users.count({ where }),
    ]);

    return { data, total, page, limit };
  }

  async findByIdWithRoles(id: string) {
    return this.prisma.users.findUnique({
      where: { id },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  async updateUser(
    id: string,
    data: { name?: string; email?: string; image?: string },
  ) {
    return this.prisma.users.update({
      where: { id },
      data,
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  async deleteUser(id: string) {
    return this.prisma.users.delete({
      where: { id },
    });
  }

  async setActiveStatus(id: string, isActive: boolean) {
    return this.prisma.users.update({
      where: { id },
      data: { isActive },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  async banUser(id: string, banReason?: string, banExpires?: Date) {
    return this.prisma.users.update({
      where: { id },
      data: {
        banned: true,
        banReason: banReason ?? null,
        banExpires: banExpires ?? null,
      },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  async unbanUser(id: string) {
    return this.prisma.users.update({
      where: { id },
      data: {
        banned: false,
        banReason: null,
        banExpires: null,
      },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.users.findUnique({
      where: { email },
    });
  }

  async createUser(data: {
    id: string;
    name: string;
    email: string;
    password: string;
  }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.prisma.$transaction(async (tx) => {
      const user = await tx.users.create({
        data: {
          id: data.id,
          name: data.name,
          email: data.email,
          emailVerified: false,
        },
      });

      await tx.accounts.create({
        data: {
          userId: user.id,
          accountId: user.id,
          providerId: 'credential',
          password: hashedPassword,
        },
      });

      const defaultRole = await tx.roles.findUnique({
        where: { name: 'user' },
      });

      if (!defaultRole) {
        throw new Error('Default role "user" not found');
      }

      await tx.userRoles.create({
        data: {
          userId: user.id,
          roleId: defaultRole.id,
        },
      });

      return tx.users.findUnique({
        where: { id: user.id },
        include: {
          userRoles: {
            include: { role: true },
          },
        },
      });
    });
  }

  async setEmailVerified(id: string, verified: boolean) {
    return this.prisma.users.update({
      where: { id },
      data: { emailVerified: verified },
      include: {
        userRoles: {
          include: { role: true },
        },
      },
    });
  }

  async findSessionsByUserId(userId: string) {
    return this.prisma.sessions.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async deleteSessionsByUserId(userId: string) {
    return this.prisma.sessions.deleteMany({
      where: { userId },
    });
  }

  async findMeWithRoles(userId: string) {
    return this.prisma.users.findUnique({
      where: { id: userId },
      include: {
        userRoles: {
          include: { role: true },
        },
      },
    });
  }

  async updateMyProfile(
    userId: string,
    data: { name?: string; image?: string; bio?: string },
  ) {
    return this.prisma.users.update({
      where: { id: userId },
      data,
      include: {
        userRoles: {
          include: { role: true },
        },
      },
    });
  }

  async updateMyPreferences(
    userId: string,
    data: { emailNotificationsEnabled?: boolean },
  ) {
    return this.prisma.users.update({
      where: { id: userId },
      data,
      include: {
        userRoles: {
          include: { role: true },
        },
      },
    });
  }

  private mapSortByToField(sortBy?: UserSortBy): string {
    switch (sortBy) {
      case UserSortBy.NAME:
        return 'name';
      case UserSortBy.EMAIL:
        return 'email';
      case UserSortBy.UPDATED_AT:
        return 'updatedAt';
      case UserSortBy.CREATED_AT:
      default:
        return 'createdAt';
    }
  }
}
