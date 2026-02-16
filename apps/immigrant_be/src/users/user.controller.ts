import {
  Body,
  Controller,
  Get,
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

@ApiTags('Users')
@ApiExtraModels(PlanImmigrationVisaTypeDto, UserDetailsDto)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

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
      steps: createUserPlanDto.steps,
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
}
