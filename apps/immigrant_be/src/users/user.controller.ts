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
import { UserPlanResponseDto } from './dto/user-plan-response.dto';
import {
  PlanResponseDto,
  PlanImmigrationVisaTypeDto,
} from './dto/plan-response.dto';
import { UserDetailsDto } from './dto/user-detail.dto';
import { MarkStepDto } from './dto/mark-step.dto';
import { MyProfileResponseDto } from './dto/my-profile-response.dto';
import { UpdateMyProfileDto } from './dto/update-my-profile.dto';

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
  @ApiOperation({ summary: 'Update own profile (name and image only)' })
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
  getUserPlan(@Session() user: UserSession, @Param('id') id: string) {
    return this.userService.getUserPlan(user, id);
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
  @ApiQuery({
    name: 'language',
    description: 'Language to resolve visa steps (default: en)',
    required: false,
    type: String,
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
    @Query('language') language?: string,
  ): Promise<{ id: string }> {
    return this.userService.selectVisaType(user, plan_id, visaTypeId, language);
  }

  @ApiOperation({
    summary: 'Update plan steps with full remaining and completed state',
    description:
      'Replaces the plan step state with the full `steps_remaining` and `steps_completed` objects sent by the client. ' +
      'The server recalculates `progress` and persists the new state. ' +
      'Sending the legacy fields `category`, `step_name`, or `completed` will result in a 400 Bad Request.',
  })
  @ApiParam({
    name: 'plan_id',
    description: 'ID of the plan to update',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiBody({ type: MarkStepDto })
  @ApiOkResponse({
    description: 'Plan steps updated and progress recalculated',
    schema: { example: { id: '123e4567-e89b-12d3-a456-426614174000' } },
  })
  @ApiBadRequestResponse({
    description: 'Validation failed — `steps_remaining` or `steps_completed` is missing or not an object',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Plan not found or does not belong to the user',
  })
  @HttpCode(HttpStatus.OK)
  @Patch('/plan/:plan_id/step')
  async markStep(
    @Session() session: UserSession,
    @Param('plan_id') plan_id: string,
    @Body() dto: MarkStepDto,
  ): Promise<{ id: string }> {
    return this.userService.markStep(session, plan_id, dto);
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
