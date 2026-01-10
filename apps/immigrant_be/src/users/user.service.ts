import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Steps, SuggestionItem } from '../system/dto/suggestions.dto';
import { UserSession } from '@thallesp/nestjs-better-auth';
import { Plans, Users } from 'generated/prisma';
import { PlanResponseDto } from './dto/plan-response.dto';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { PLAN_QUEUE } from '@app/config/constants';

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
  ): Promise<PlanResponseDto | null> {
    return await this.userRepository.getUserPlan(user, plan_id);
  }

  async selectVisaType(
    user: UserSession,
    plan_id: string,
    visa_type_id: string,
  ): Promise<boolean> {
    return await Promise.resolve(true);
  }

  async getUserById(userId: string): Promise<Users | null> {
    const user = await this.userRepository.getUserById(userId);

    if (!user) {
      return null;
    }

    return user;
  }
}
