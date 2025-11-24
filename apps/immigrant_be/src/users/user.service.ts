import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { Steps, SuggestionItem } from '../system/dto/suggestions.dto';
import { UserSession } from '@thallesp/nestjs-better-auth';
import { Plans } from 'generated/prisma';
import { PlanResponseDto } from './dto/plan-response.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

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
    planId: string,
    visaTypeId: string,
  ): Promise<PlanResponseDto> {
    try {
      return await this.userRepository.selectVisaType(user, planId, visaTypeId);
    } catch (error) {
      if (error.message === 'Plan not found or does not belong to the user') {
        throw new NotFoundException(error.message);
      }
      if (
        error.message ===
        'Visa type not found or does not belong to the plan country'
      ) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }
}
