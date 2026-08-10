import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Put,
  Param,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Session } from '@nestjs/common';
import { type UserSession } from '@thallesp/nestjs-better-auth';
import { UserService } from './user.service';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiExtraModels,
  ApiParam,
  ApiBadRequestResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateUserPlanDto } from './dto/create-user-plan.dto';
import { CreateUserPlanFromCountryDto } from './dto/create-user-plan-from-country.dto';
import { UserPlanResponseDto } from './dto/user-plan-response.dto';
import {
  PlanResponseDto,
  PlanImmigrationVisaTypeDto,
} from './dto/plan-response.dto';
import { UserDetailsDto } from './dto/user-detail.dto';
import { UpdatePlanStepsDto } from './dto/update-plan-steps.dto';
import { MyProfileResponseDto } from './dto/my-profile-response.dto';
import { UpdateMyProfileDto } from './dto/update-my-profile.dto';
import { UpdateMyPreferencesDto } from './dto/update-my-preferences.dto';

@ApiTags('Users')
@ApiCookieAuth('better-auth.session_token')
@ApiUnauthorizedResponse({ description: 'Authentication required' })
@ApiExtraModels(PlanImmigrationVisaTypeDto, UserDetailsDto)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // ── Profile ───────────────────────────────────────────────

  @Get('/me')
  @ApiOperation({ summary: 'Get own profile' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Profile retrieved successfully',
    type: MyProfileResponseDto,
  })
  getMyProfile(@Session() session: UserSession) {
    return this.userService.getMyProfile(session.user.id);
  }

  @Patch('/me')
  @ApiOperation({ summary: 'Update own profile (name, image, bio)' })
  @ApiBody({ type: UpdateMyProfileDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Profile updated successfully',
    type: MyProfileResponseDto,
  })
  updateMyProfile(
    @Session() session: UserSession,
    @Body() dto: UpdateMyProfileDto,
  ) {
    return this.userService.updateMyProfile(session.user.id, dto);
  }

  @Patch('/me/preferences')
  @ApiOperation({ summary: 'Update own notification preferences' })
  @ApiBody({ type: UpdateMyPreferencesDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Preferences updated successfully',
    type: MyProfileResponseDto,
  })
  updateMyPreferences(
    @Session() session: UserSession,
    @Body() dto: UpdateMyPreferencesDto,
  ) {
    return this.userService.updateMyPreferences(session.user.id, dto);
  }

  @ApiOperation({
    summary: 'Create a user plan',
    description: 'Creates a user plan based on a country suggestion',
  })
  @ApiBody({ type: CreateUserPlanDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User plan created successfully',
    type: UserPlanResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid request data or missing required fields',
  })
  @Post('/plan')
  createUserPlan(
    @Session() user: UserSession,
    @Body() createUserPlanDto: CreateUserPlanDto,
  ) {
    return this.userService.createUserPlan({
      user,
      suggestion: createUserPlanDto.suggestion,
      suggestion_id: createUserPlanDto.suggestion_id,
    });
  }

  @ApiOperation({
    summary: 'Create a user plan from country selection',
    description:
      'Creates a user plan for an authenticated user by selecting a country directly, without a quiz suggestion',
  })
  @ApiBody({ type: CreateUserPlanFromCountryDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User plan created successfully',
    type: UserPlanResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid country_id or country not found',
  })
  @Post('/plan/from-country')
  createUserPlanFromCountry(
    @Session() user: UserSession,
    @Body() dto: CreateUserPlanFromCountryDto,
  ) {
    return this.userService.createUserPlanFromCountry(user, dto.country_id);
  }

  @ApiOperation({
    summary: 'Get all user plans',
    description: 'Gets all user plans based on the authenticated user ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'All user plans retrieved successfully',
    type: [UserPlanResponseDto],
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - User not authenticated',
  })
  @Get('/plan')
  getAllUserPlans(@Session() user: UserSession) {
    return this.userService.getAllUserPlans(user);
  }

  @ApiOperation({
    summary: 'Get user plan by id',
    description: 'Gets a user plan by id based on the authenticated user ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Plan ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @ApiQuery({
    name: 'language',
    description:
      'Language to resolve the step text into (en | pt | es). Defaults to en, and falls back to en when the visa type has no row for the requested language. The completion state is language-independent, so switching only changes the copy.',
    required: false,
    type: String,
    example: 'pt',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User plan retrieved successfully',
    type: PlanResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Plan not found or does not belong to the user',
  })
  @Get('/plan/:id')
  getUserPlan(
    @Session() user: UserSession,
    @Param('id') id: string,
    @Query('language') language?: string,
  ) {
    return this.userService.getUserPlan(user, id, language);
  }

  @ApiOperation({
    summary: 'Select visa type for a user plan',
    description:
      'Selects a visa type for a specific plan. The plan must belong to the authenticated user.',
  })
  @ApiParam({
    name: 'plan_id',
    description: 'ID of the plan to update',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiParam({
    name: 'visa_type_id',
    description: 'ID of the visa type to select',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Visa type selected successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Plan not found or does not belong to the user',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description:
      'Invalid visa type ID or visa type does not belong to the plan country',
  })
  @HttpCode(HttpStatus.CREATED)
  @Put('/plan/:plan_id/visa-type/:visa_type_id')
  async selectVisaType(
    @Session() user: UserSession,
    @Param('plan_id') plan_id: string,
    @Param('visa_type_id') visaTypeId: string,
  ): Promise<{ id: string }> {
    return this.userService.selectVisaType(user, plan_id, visaTypeId);
  }

  @ApiOperation({
    summary: 'Replace the set of completed step keys',
    description:
      'The client owns the completion state and sends it whole, as a list of stable step keys. ' +
      'Keys are language-independent, so the same payload is valid whatever locale the user is reading in. ' +
      'Keys the visa type does not declare are discarded, and the server recalculates `progress` over the required steps.',
  })
  @ApiParam({
    name: 'plan_id',
    description: 'ID of the plan to update',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: UpdatePlanStepsDto })
  @ApiOkResponse({
    description: 'Completed step keys replaced and progress recalculated',
    schema: {
      example: { id: '123e4567-e89b-12d3-a456-426614174000', progress: 0.5 },
    },
  })
  @ApiBadRequestResponse({
    description:
      '`completed_step_keys` is missing or not a string array, or the plan has no selected visa type',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Plan not found or does not belong to the user',
  })
  @HttpCode(HttpStatus.OK)
  @Patch('/plan/:plan_id/step')
  async updateSteps(
    @Session() session: UserSession,
    @Param('plan_id') plan_id: string,
    @Body() dto: UpdatePlanStepsDto,
  ): Promise<{ id: string; progress: number }> {
    return this.userService.updateSteps(session, plan_id, dto);
  }

  @ApiOperation({ summary: 'Migrate all remaining steps to completed' })
  @ApiParam({ name: 'plan_id', type: String })
  @ApiOkResponse({
    description: 'All steps migrated to completed',
    schema: { example: { id: 'uuid' } },
  })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Plan not found' })
  @HttpCode(HttpStatus.OK)
  @Patch('/plan/:plan_id/steps/complete-all')
  async completeAllSteps(
    @Session() session: UserSession,
    @Param('plan_id') plan_id: string,
  ): Promise<{ id: string }> {
    return this.userService.completeAllSteps(session, plan_id);
  }
}
