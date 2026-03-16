import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { VisaStepsService } from './visa-steps.service';
import { CreateVisaStepsDto } from './dto/create-visa-steps.dto';
import { TranslateVisaStepsDto } from './dto/translate-visa-steps.dto';
import { UpdateVisaStepsDto } from './dto/update-visa-steps.dto';
import { VisaStepsDto } from './dto/visa-steps.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';

@ApiTags('VisaSteps')
@Roles(UserRole.ADMIN)
@ApiCookieAuth('better-auth.session_token')
@ApiUnauthorizedResponse({ description: 'Authentication required' })
@ApiForbiddenResponse({ description: 'Admin role required' })
@Controller('admin/visa-steps')
export class VisaStepsController {
  constructor(private readonly visaStepsService: VisaStepsService) {}

  @Post()
  @ApiOperation({
    summary: 'Create visa steps',
    description: 'Creates visa steps for a visa type and language',
  })
  @ApiBody({ type: CreateVisaStepsDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Visa steps created successfully',
    type: VisaStepsDto,
  })
  create(@Body() dto: CreateVisaStepsDto) {
    return this.visaStepsService.create(dto);
  }

  @Post('translate')
  @ApiOperation({
    summary: 'Translate visa steps',
    description: 'Translates visa steps JSON to Portuguese or Spanish using AI',
  })
  @ApiBody({ type: TranslateVisaStepsDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Translated steps',
    schema: { type: 'object' },
  })
  async translate(@Body() dto: TranslateVisaStepsDto) {
    return this.visaStepsService.translate(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'List visa steps',
    description: 'Lists visa steps filtered by visa type and language',
  })
  @ApiQuery({
    name: 'visa_type_id',
    required: false,
    type: String,
    description: 'Visa type id to filter results',
  })
  @ApiQuery({
    name: 'language',
    required: false,
    type: String,
    description: 'Language code to filter results',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Visa steps retrieved successfully',
    type: [VisaStepsDto],
  })
  findAll(
    @Query('visa_type_id') visa_type_id?: string,
    @Query('language') language?: string,
  ) {
    return this.visaStepsService.findAll({ visa_type_id, language });
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update visa steps',
    description: 'Updates the visa steps by id',
  })
  @ApiParam({
    name: 'id',
    description: 'Visa steps id',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @ApiBody({ type: UpdateVisaStepsDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Visa steps updated successfully',
    type: VisaStepsDto,
  })
  update(@Param('id') id: string, @Body() dto: UpdateVisaStepsDto) {
    return this.visaStepsService.update(id, dto);
  }
}
