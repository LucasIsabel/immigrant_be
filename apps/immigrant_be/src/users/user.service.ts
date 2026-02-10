import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Steps, SuggestionItem } from '../system/dto/suggestions.dto';
import { UserSession } from '@thallesp/nestjs-better-auth';
import { Plans, Users } from 'generated/prisma';
import { PlanResponseDto } from './dto/plan-response.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { PLAN_QUEUE, PROCESS_CREATE_PLAN } from '@app/config/constants';
import { ListUsersQueryDto } from './dto/list-users-query.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { PaginatedUsersResponseDto } from './dto/paginated-users-response.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    @InjectQueue(PLAN_QUEUE) private readonly planQueue: Queue,
  ) {}

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
    return await this.userRepository.createUserPlan({
      user,
      suggestion,
      suggestion_id,
      steps,
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
  ): Promise<{ id: string } | null> {
    const selectedLanguage = language ?? 'en';

    const updatedPlan = await this.userRepository.selectVisaType(
      user,
      plan_id,
      visa_type_id,
    );

    const visaSteps = await this.userRepository.getVisaStepsByRecommendation(
      visa_type_id,
      selectedLanguage,
    );

    if (visaSteps?.steps) {
      await this.userRepository.updatePlanSteps(plan_id, visaSteps.steps);
      return { id: plan_id };
    }

    await this.planQueue.add(PROCESS_CREATE_PLAN, {
      plan_id: updatedPlan.id,
      visa_type_id,
      language: selectedLanguage,
      user_id: user.user.id,
    });

    return null;
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

    return this.userRepository.setActiveStatus(id, false);
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

    return this.userRepository.banUser(id, dto.banReason, banExpires);
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
}
