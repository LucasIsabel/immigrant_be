import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { SystemService } from './system.service';
import { Body, Controller, Post, Query } from '@nestjs/common';
import { SuggestionsDto, SuggestionsResponseDto } from './dto/suggestions.dto';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@Controller('system')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  @Post('/suggestions')
  @ApiOperation({
    summary: 'Get suggestions for a query',
    description: 'Retrieves a list of suggestions for a given query',
  })
  @ApiBody({ type: SuggestionsDto })
  @ApiResponse({
    status: 201,
    description: 'Suggestions created successfully',
    type: SuggestionsResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid request data or missing required fields',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error or AI service unavailable',
  })
  @AllowAnonymous()
  create(
    @Body() suggestionsDto: SuggestionsDto,
    @Query('language') language?: string,
  ) {
    return this.systemService.createSuggestions({
      steps: suggestionsDto.steps,
      language,
    });
  }
}
