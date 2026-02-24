import { PrismaService } from '@app/database';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Steps, SuggestionItem } from '../system/dto/suggestions.dto';
import { UserSession } from '@thallesp/nestjs-better-auth';
import { ImmigrationVisaType, Plans, Prisma, Users } from 'generated/prisma';
import { PlanResponseDto } from './dto/plan-response.dto';
import { formatPlanResponse } from './utils/formatter';
import { ListUsersQueryDto, UserSortBy } from './dto/list-users-query.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUserPlan({
    user,
    suggestion,
    suggestion_id,
    steps,
  }: {
    user: UserSession;
    suggestion: SuggestionItem;
    suggestion_id: string;
    steps: Array<Steps>;
  }): Promise<Plans> {
    const stepsJson =
      steps && steps.length > 0
        ? (JSON.parse(JSON.stringify(steps)) as Prisma.InputJsonValue)
        : Prisma.JsonNull;

    return this.prisma.plans.create({
      data: {
        user_id: user.user.id,
        suggestion_id: suggestion_id,
        country_id: suggestion.country_id,
        steps: stepsJson,
        steps_completed: [] as Prisma.InputJsonValue,
        steps_remaining: stepsJson,
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

  async getUserPlan(
    user: UserSession,
    plan_id: string,
  ): Promise<PlanResponseDto | null> {
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

    const visaTypes = await this.getVisaTypes(data?.country_id);

    return formatPlanResponse(data, visaTypes);
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

  async updatePlanStepsRemaining(planId: string, steps: Prisma.InputJsonValue) {
    return this.prisma.plans.update({
      where: {
        id: planId,
      },
      data: {
        steps_remaining: steps,
      },
    });
  }

  async getUserPlanRaw(user: UserSession, plan_id: string): Promise<Plans | null> {
    return this.prisma.plans.findUnique({
      where: { id: plan_id, user_id: user.user.id },
    });
  }

  async updatePlanStepProgress(
    planId: string,
    steps_remaining: Prisma.InputJsonValue,
    steps_completed: Prisma.InputJsonValue,
    progress: number,
  ) {
    return this.prisma.plans.update({
      where: { id: planId },
      data: { steps_remaining, steps_completed, progress },
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
