import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UserRepository } from './user.repository';
import { SuggestionItem } from '../system/dto/suggestions.dto';
import { UserSession } from '@thallesp/nestjs-better-auth';
import { Plans, Users } from 'generated/prisma';
import { PlanResponseDto } from './dto/plan-response.dto';
import { ListUsersQueryDto } from './dto/list-users-query.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { PaginatedUsersResponseDto } from './dto/paginated-users-response.dto';
import { MarkStepDto } from './dto/mark-step.dto';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { UpdateMyProfileDto } from './dto/update-my-profile.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUserPlan({
    user,
    suggestion,
    suggestion_id,
  }: {
    user: UserSession;
    suggestion: SuggestionItem;
    suggestion_id: string;
  }): Promise<Plans> {
    return await this.userRepository.createUserPlan({
      user,
      suggestion,
      suggestion_id,
    });
  }

  async getAllUserPlans(user: UserSession): Promise<Plans[]> {
    return await this.userRepository.getAllUserPlans(user);
  }

  async getUserPlan(
    user: UserSession,
    plan_id: string,
  ): Promise<PlanResponseDto> {
    // Validate user session
    if (!user?.user?.id) {
      throw new BadRequestException('User session is invalid');
    }

    // Validate plan_id format (UUID)
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(plan_id)) {
      throw new BadRequestException('Invalid plan ID format');
    }

    // Get plan from repository
    const plan = await this.userRepository.getUserPlan(user, plan_id);

    // Validate plan exists and belongs to user
    if (!plan) {
      throw new NotFoundException(
        'Plan not found or does not belong to the user',
      );
    }

    return plan;
  }

  async selectVisaType(
    user: UserSession,
    plan_id: string,
    visa_type_id: string,
    language?: string,
  ): Promise<{ id: string }> {
    const selectedLanguage = language ?? 'en';

    await this.userRepository.selectVisaType(user, plan_id, visa_type_id);

    const visaSteps = await this.userRepository.getVisaStepsByRecommendation(
      visa_type_id,
      selectedLanguage,
    );

    if (!visaSteps?.steps) {
      throw new NotFoundException(
        'Visa steps not found for the selected visa type and language',
      );
    }

    await this.userRepository.updatePlanStepsRemaining(
      plan_id,
      visaSteps.steps,
    );

    return { id: plan_id };
  }

  async markStep(
    user: UserSession,
    plan_id: string,
    dto: MarkStepDto,
  ): Promise<{ id: string }> {
    const plan = await this.userRepository.getUserPlanRaw(user, plan_id);
    if (!plan) {
      throw new NotFoundException(
        'Plan not found or does not belong to the user',
      );
    }

    const { steps_remaining, steps_completed } = dto;

    const totalRemaining = Object.values(steps_remaining).reduce(
      (acc, arr) => acc + arr.length,
      0,
    );
    const totalCompleted = Object.values(steps_completed).reduce(
      (acc, arr) => acc + arr.length,
      0,
    );
    const total = totalRemaining + totalCompleted;
    const progress = total > 0 ? totalCompleted / total : 0;

    await this.userRepository.updatePlanStepProgress(
      plan_id,
      steps_remaining,
      steps_completed,
      progress,
    );

    return { id: plan_id };
  }

  async completeAllSteps(
    user: UserSession,
    plan_id: string,
  ): Promise<{ id: string }> {
    const plan = await this.userRepository.getUserPlanRaw(user, plan_id);
    if (!plan) {
      throw new NotFoundException(
        'Plan not found or does not belong to the user',
      );
    }

    const remaining =
      (plan.steps_remaining as Record<string, any[]> | null) ?? {};
    const completedSteps =
      (plan.steps_completed as Record<string, any[]> | null) ?? {};

    for (const [category, items] of Object.entries(remaining)) {
      if (!completedSteps[category]) completedSteps[category] = [];
      for (const step of items) {
        completedSteps[category].push({ ...step, checked: true });
      }
    }

    await this.userRepository.updatePlanStepProgress(
      plan_id,
      {},
      completedSteps,
      1,
    );

    return { id: plan_id };
  }

  async getUserById(userId: string): Promise<Users | null> {
    const user = await this.userRepository.getUserById(userId);

    if (!user) {
      return null;
    }

    return user;
  }

  // ── Admin User Management ─────────────────────────────────

  async findAllUsers(
    query: ListUsersQueryDto,
  ): Promise<PaginatedUsersResponseDto> {
    const { data, total, page, limit } =
      await this.userRepository.findAllPaginated(query);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findUserByIdAdmin(id: string) {
    const user = await this.userRepository.findByIdWithRoles(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateUser(id: string, dto: UpdateUserDto) {
    const user = await this.userRepository.findByIdWithRoles(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (dto.email && dto.email !== user.email) {
      const existing = await this.userRepository.findByEmail(dto.email);
      if (existing) {
        throw new ConflictException('Email already in use');
      }
    }

    return this.userRepository.updateUser(id, dto);
  }

  async deleteUser(id: string, adminUserId: string) {
    if (id === adminUserId) {
      throw new BadRequestException('Cannot delete your own account');
    }

    const user = await this.userRepository.findByIdWithRoles(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.deleteUser(id);
  }

  async activateUser(id: string) {
    const user = await this.userRepository.findByIdWithRoles(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.isActive) {
      throw new ConflictException('User is already active');
    }

    return this.userRepository.setActiveStatus(id, true);
  }

  async deactivateUser(id: string) {
    const user = await this.userRepository.findByIdWithRoles(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.isActive) {
      throw new ConflictException('User is already inactive');
    }

    const result = await this.userRepository.setActiveStatus(id, false);
    await this.userRepository.deleteSessionsByUserId(id);
    return result;
  }

  async banUser(id: string, dto: BanUserDto, adminUserId: string) {
    if (id === adminUserId) {
      throw new BadRequestException('Cannot ban your own account');
    }

    const user = await this.userRepository.findByIdWithRoles(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.banned) {
      throw new ConflictException('User is already banned');
    }

    const banExpires = dto.banExpiresInSeconds
      ? new Date(Date.now() + dto.banExpiresInSeconds * 1000)
      : undefined;

    const result = await this.userRepository.banUser(id, dto.banReason, banExpires);
    await this.userRepository.deleteSessionsByUserId(id);
    return result;
  }

  async unbanUser(id: string) {
    const user = await this.userRepository.findByIdWithRoles(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.banned) {
      throw new ConflictException('User is not banned');
    }

    return this.userRepository.unbanUser(id);
  }

  async createAdminUser(dto: CreateAdminUserDto) {
    const existing = await this.userRepository.findByEmail(dto.email);
    if (existing) {
      throw new ConflictException('Email already in use');
    }

    const id = randomUUID();
    const user = await this.userRepository.createUser({
      id,
      name: dto.name,
      email: dto.email,
      password: dto.password,
    });

    if (!user) {
      throw new NotFoundException('Default role "user" not found');
    }

    return user;
  }

  async verifyUserEmail(id: string, verified: boolean) {
    const user = await this.userRepository.findByIdWithRoles(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.emailVerified === verified) {
      throw new ConflictException(
        verified ? 'Email is already verified' : 'Email is already unverified',
      );
    }

    return this.userRepository.setEmailVerified(id, verified);
  }

  async getUserSessions(id: string) {
    const user = await this.userRepository.findByIdWithRoles(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userRepository.findSessionsByUserId(id);
  }

  async revokeUserSessions(id: string) {
    const user = await this.userRepository.findByIdWithRoles(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    await this.userRepository.deleteSessionsByUserId(id);
  }

  async getMyProfile(userId: string) {
    const user = await this.userRepository.findMeWithRoles(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateMyProfile(userId: string, dto: UpdateMyProfileDto) {
    const user = await this.userRepository.findMeWithRoles(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userRepository.updateMyProfile(userId, dto);
  }
}
