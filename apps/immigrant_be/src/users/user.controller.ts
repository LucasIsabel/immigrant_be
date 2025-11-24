import { Body, Controller, Get, Post, Put, Param } from '@nestjs/common';
import { Session } from '@nestjs/common';
import type { UserSession } from '@thallesp/nestjs-better-auth';
import { UserService } from './user.service';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiExtraModels,
  ApiParam,
} from '@nestjs/swagger';
import { CreateUserPlanDto } from './dto/create-user-plan.dto';
import { UserPlanResponseDto } from './dto/user-plan-response.dto';
import {
  PlanResponseDto,
  ImmigrationVisaTypeDto,
} from './dto/plan-response.dto';

@ApiExtraModels(ImmigrationVisaTypeDto)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Create a user plan',
    description: 'Creates a user plan based on a country suggestion',
  })
  @ApiBody({ type: CreateUserPlanDto })
  @ApiResponse({
    status: 201,
    description: 'User plan created successfully',
    type: UserPlanResponseDto,
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
    status: 200,
    description: 'All user plans retrieved successfully',
    type: [UserPlanResponseDto],
  })
  @Get('/plan')
  getAllUserPlans(@Session() user: UserSession) {
    return this.userService.getAllUserPlans(user);
  }

  @ApiOperation({
    summary: 'Get user plan by id',
    description: 'Gets a user plan by id based on the authenticated user ID',
  })
  @ApiResponse({
    status: 200,
    description: 'User plan retrieved successfully',
    type: PlanResponseDto,
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
    name: 'planId',
    description: 'ID of the plan to update',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiParam({
    name: 'visaTypeId',
    description: 'ID of the visa type to select',
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Visa type selected successfully',
    type: PlanResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Plan not found or does not belong to the user',
  })
  @ApiResponse({
    status: 400,
    description:
      'Invalid visa type ID or visa type does not belong to the plan country',
  })
  @Put('/plan/:planId/visa-type/:visaTypeId')
  async selectVisaType(
    @Session() user: UserSession,
    @Param('planId') planId: string,
    @Param('visaTypeId') visaTypeId: string,
  ): Promise<PlanResponseDto> {
    return await this.userService.selectVisaType(user, planId, visaTypeId);
  }
}
