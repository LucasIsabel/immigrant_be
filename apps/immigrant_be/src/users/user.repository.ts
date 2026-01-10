import { PrismaService } from '@app/database';
import { Injectable } from '@nestjs/common';
import { Steps, SuggestionItem } from '../system/dto/suggestions.dto';
import { UserSession } from '@thallesp/nestjs-better-auth';
import { ImmigrationVisaType, Plans, Users } from 'generated/prisma';
import { PlanResponseDto } from './dto/plan-response.dto';
import { formatPlanResponse } from './utils/formatter';

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
    return this.prisma.plans.create({
      data: {
        user_id: user.user.id,
        suggestion_id: suggestion_id,
        country_id: suggestion.country_id,
        steps: JSON.parse(JSON.stringify(steps)),
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
  ): Promise<PlanResponseDto> {
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
      throw new Error('Plan not found or does not belong to the user');
    }

    // Verify that the visa type exists and belongs to the plan's country
    if (plan.country_id) {
      const visaType = await this.prisma.immigrationVisaType.findFirst({
        where: {
          id: visaTypeId,
          country_id: plan.country_id,
        },
      });

      if (!visaType) {
        throw new Error(
          'Visa type not found or does not belong to the plan country',
        );
      }
    }

    // Update the plan with the selected visa type
    const updatedPlan = await this.prisma.plans.update({
      where: {
        id: planId,
      },
      data: {
        selected_visa_type_id: visaTypeId,
      },
      include: {
        suggestion: true,
        country: true,
        user: true,
        selected_visa_type: true,
      },
    });

    // Get visa types for the response
    const visaTypes = await this.getVisaTypes(updatedPlan.country_id);

    return formatPlanResponse(updatedPlan, visaTypes);
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
}
