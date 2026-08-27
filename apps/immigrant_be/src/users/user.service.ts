import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { UserRepository } from './user.repository';
import { CountryService } from '../countries/country.service';
import {
  DEFAULT_LANGUAGE,
  pickTranslation,
  SUPPORTED_LANGUAGES,
} from '../countries/country-translation.util';
import { SuggestionItem } from '../system/dto/suggestions.dto';
import { UserSession } from '@thallesp/nestjs-better-auth';
import { Plans, Users } from 'generated/prisma';
import { PlanResponseDto } from './dto/plan-response.dto';
import { formatPlanResponse } from './utils/formatter';
import { ListUsersQueryDto } from './dto/list-users-query.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { PaginatedUsersResponseDto } from './dto/paginated-users-response.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { UpdatePlanStepsDto } from './dto/update-plan-steps.dto';
import {
  intersectWithTemplate,
  parseStoredSteps,
  resolvePlanSteps,
  type StoredSteps,
} from './utils/resolve-plan-steps';
import { CreateAdminUserDto } from './dto/create-admin-user.dto';
import { UpdateMyProfileDto } from './dto/update-my-profile.dto';
import { UpdateMyPreferencesDto } from './dto/update-my-preferences.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly countryService: CountryService,
  ) {}

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

  async createUserPlanFromCountry(
    user: UserSession,
    country_id: string,
    language: string = DEFAULT_LANGUAGE,
  ): Promise<Plans> {
    const country = await this.countryService.findOne(country_id);
    const translation = pickTranslation(country.translations, language);
    const suggestion: SuggestionItem = {
      country: country.name,
      // Vem direto do cadastro, então chave e rótulo são o mesmo nome: aqui
      // não passa IA nenhuma para traduzir o campo.
      country_label: country.name,
      country_id: country.id,
      country_flag: country.flag,
      country_background: country.background_image,
      cities: country.popular_cities ?? [],
      visa_options: country.visa_options ?? [],
      investment_required: translation?.investment_required ?? '',
      average_visa_processing_time: translation?.processing_time ?? '',
      job_market: country.job_market,
      difficulty: country.difficulty,
      compatibility: 0,
      reasons: [],
      education_quality: '',
      health_care: '',
      languages: translation?.language_requirement
        ? [translation.language_requirement]
        : [],
      // A plan started from the country page carries no quiz, so no passport:
      // there is nothing to compare the destination against, and claiming the
      // exemption on a passport we were never told is worse than omitting it.
      freedom_of_movement: false,
    };
    return await this.userRepository.createUserPlan({
      user,
      suggestion,
      suggestion_id: null,
    });
  }

  async getAllUserPlans(user: UserSession): Promise<Plans[]> {
    return await this.userRepository.getAllUserPlans(user);
  }

  async getUserPlan(
    user: UserSession,
    plan_id: string,
    language?: string,
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

    // An unknown locale is not worth a 400 on a read — it degrades to the
    // fallback, same as a language with no row.
    const requestedLanguage =
      language && (SUPPORTED_LANGUAGES as readonly string[]).includes(language)
        ? language
        : DEFAULT_LANGUAGE;

    const found = await this.userRepository.getUserPlanWithRelations(
      user,
      plan_id,
    );

    if (!found) {
      throw new NotFoundException(
        'Plan not found or does not belong to the user',
      );
    }

    const { data, visaTypes } = found;

    // No visa type yet means no steps to resolve — the user is still on the
    // selection screen.
    const resolved = data.selected_visa_type_id
      ? await this.getStepTemplate(
          data.selected_visa_type_id,
          requestedLanguage,
        )
      : null;

    return formatPlanResponse(data, visaTypes, {
      steps: resolved
        ? resolvePlanSteps(resolved.template, data.completed_step_keys).steps
        : {},
      language: resolved?.language ?? requestedLanguage,
    });
  }

  /**
   * Loads the step template for a visa type, falling back to English.
   *
   * The fallback is `DEFAULT_LANGUAGE`, never Portuguese: a plan whose language
   * has no row must degrade to the language the whole system treats as
   * canonical, not to whichever one happened to be hardcoded in the client.
   */
  private async getStepTemplate(
    visaTypeId: string,
    language: string,
  ): Promise<{ template: StoredSteps; language: string } | null> {
    const requested = await this.userRepository.getVisaStepsByRecommendation(
      visaTypeId,
      language,
    );

    if (requested?.steps) {
      return { template: parseStoredSteps(requested.steps), language };
    }

    if (language === DEFAULT_LANGUAGE) {
      return null;
    }

    const fallback = await this.userRepository.getVisaStepsByRecommendation(
      visaTypeId,
      DEFAULT_LANGUAGE,
    );

    if (!fallback?.steps) {
      return null;
    }

    // Reported back to the client so `language` in the response is the language
    // the copy is actually in, not the one that was asked for.
    return {
      template: parseStoredSteps(fallback.steps),
      language: DEFAULT_LANGUAGE,
    };
  }

  async selectVisaType(
    user: UserSession,
    plan_id: string,
    visa_type_id: string,
  ): Promise<{ id: string }> {
    // The plan no longer copies the steps, so this is purely a guard: picking a
    // visa type with no template would leave the user on a page with nothing to
    // do and no explanation.
    const resolved = await this.getStepTemplate(visa_type_id, DEFAULT_LANGUAGE);

    if (!resolved || !Object.keys(resolved.template).length) {
      throw new NotFoundException(
        'Visa steps not found for the selected visa type',
      );
    }

    await this.userRepository.selectVisaType(user, plan_id, visa_type_id);
    await this.userRepository.resetPlanSteps(plan_id);

    return { id: plan_id };
  }

  /**
   * Renames a plan.
   *
   * The ownership check is the whole point of going through the service: the
   * repository update is keyed by id alone, so without this a user could rename
   * someone else's plan by guessing a UUID.
   */
  async updatePlan(
    user: UserSession,
    plan_id: string,
    dto: UpdatePlanDto,
  ): Promise<Plans> {
    const plan = await this.userRepository.getUserPlanRaw(user, plan_id);

    if (!plan) {
      throw new NotFoundException(
        'Plan not found or does not belong to the user',
      );
    }

    return this.userRepository.updatePlan(plan_id, { name: dto.name });
  }

  async updateSteps(
    user: UserSession,
    plan_id: string,
    dto: UpdatePlanStepsDto,
  ): Promise<{ id: string; progress: number }> {
    const plan = await this.userRepository.getUserPlanRaw(user, plan_id);
    if (!plan) {
      throw new NotFoundException(
        'Plan not found or does not belong to the user',
      );
    }

    if (!plan.selected_visa_type_id) {
      throw new BadRequestException(
        'Plan has no selected visa type — there are no steps to complete',
      );
    }

    const resolved = await this.getStepTemplate(
      plan.selected_visa_type_id,
      DEFAULT_LANGUAGE,
    );

    if (!resolved) {
      throw new NotFoundException(
        'Visa steps not found for the selected visa type',
      );
    }

    const { allKeys } = resolvePlanSteps(resolved.template, []);
    const keys = intersectWithTemplate(dto.completed_step_keys, allKeys);
    const { progress } = resolvePlanSteps(resolved.template, keys);

    await this.userRepository.updateCompletedStepKeys(plan_id, keys, progress);

    return { id: plan_id, progress };
  }

  async completeAllSteps(
    user: UserSession,
    plan_id: string,
  ): Promise<{ id: string; progress: number }> {
    const plan = await this.userRepository.getUserPlanRaw(user, plan_id);
    if (!plan) {
      throw new NotFoundException(
        'Plan not found or does not belong to the user',
      );
    }

    if (!plan.selected_visa_type_id) {
      throw new BadRequestException(
        'Plan has no selected visa type — there are no steps to complete',
      );
    }

    const resolved = await this.getStepTemplate(
      plan.selected_visa_type_id,
      DEFAULT_LANGUAGE,
    );

    if (!resolved) {
      throw new NotFoundException(
        'Visa steps not found for the selected visa type',
      );
    }

    const { allKeys } = resolvePlanSteps(resolved.template, []);
    const { progress } = resolvePlanSteps(resolved.template, allKeys);

    await this.userRepository.updateCompletedStepKeys(
      plan_id,
      allKeys,
      progress,
    );

    return { id: plan_id, progress };
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

    const result = await this.userRepository.banUser(
      id,
      dto.banReason,
      banExpires,
    );
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

  async updateMyPreferences(userId: string, dto: UpdateMyPreferencesDto) {
    const user = await this.userRepository.findMeWithRoles(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userRepository.updateMyPreferences(userId, dto);
  }
}
