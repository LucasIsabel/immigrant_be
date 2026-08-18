import {
  ApiBadRequestResponse,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { SystemService } from './system.service';
import {
  Body,
  Controller,
  Param,
  Post,
  Query,
  Session,
  Sse,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SuggestionsDto, SuggestionsResponseDto } from './dto/suggestions.dto';
import { AllowAnonymous, type UserSession } from '@thallesp/nestjs-better-auth';
import { map, defer, repeat, filter } from 'rxjs';
import { EventsService } from './events.service';
import { UserDetailsQueryDto } from '../users/dto/user-details-query.dto';
import { VisaRecommendationResponseDto } from './dto/visa-recommendation-response.dto';

@ApiTags('System')
@Controller('system')
export class SystemController {
  constructor(
    private readonly systemService: SystemService,
    private readonly eventsService: EventsService,
  ) {}

  @Post('/suggestions')
  @ApiOperation({
    summary: 'Get suggestions for a query',
    description: 'Retrieves a list of suggestions for a given query',
  })
  @ApiBody({ type: SuggestionsDto })
  @ApiQuery({
    name: 'language',
    description: 'Language code for the response (e.g., en, pt, es)',
    example: 'en',
    type: String,
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
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
      parameters: suggestionsDto,
      language,
    });
  }

  @Sse('/sse')
  @ApiOperation({
    summary: 'Server-Sent Events for notifications',
    description:
      'Establishes a Server-Sent Events connection to receive real-time notifications for the authenticated user',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'SSE connection established successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized - User not authenticated',
  })
  notification(@Session() session: UserSession) {
    const userId = session?.user?.id;

    return defer(() =>
      userId
        ? this.eventsService.getAndConsumeNextEvent(userId)
        : Promise.resolve(null),
    ).pipe(
      repeat({ delay: 1000 }),
      filter((result): result is NonNullable<typeof result> =>
        Boolean(result?.id),
      ),
      map((event) => ({
        data: JSON.stringify(event),
        type: 'message' as const,
      })),
    );
  }

  // Nenhum recurso é criado aqui — é uma leitura que usa corpo para filtrar —,
  // então o 201 padrão do POST no Nest nunca foi o código certo, e o
  // `@ApiResponse` abaixo já promete 200. Sem isto o servidor responde 201
  // enquanto o contrato diz 200, e o cliente gerado tipa sobre um código que
  // nunca chega.
  @HttpCode(HttpStatus.OK)
  @Post('/country/:id/visa-type')
  @ApiOperation({
    summary: 'Get best visa types for a country',
    description:
      'Retrieves the best visa types for a specific country based on user details',
  })
  @ApiParam({
    name: 'id',
    description: 'Country ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @ApiBody({
    type: UserDetailsQueryDto,
    description: 'User details to filter visa types',
    required: false,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Visa type recommendation retrieved successfully',
    type: VisaRecommendationResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid country ID or request parameters',
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  selectedBestVisaType(
    @Body() userDetails: UserDetailsQueryDto,
    @Param('id') countryId: string,
    @Query('language') language?: string,
  ) {
    return this.systemService.getSelectedBestVisaType(
      userDetails,
      countryId,
      language,
    );
  }
}
