import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiQuery,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { ImmigrationVisaTypeService } from './immigration-visa-type.service';
import { CreateImmigrationVisaTypeDto } from './dto/create-immigration-visa-type.dto';
import { UpdateImmigrationVisaTypeDto } from './dto/update-immigration-visa-type.dto';
import { ImmigrationVisaTypeDto } from './dto/immigration-visa-type.dto';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { Roles } from '../common/decorators/roles.decorator';

@ApiTags('Immigration Visa Types')
@Controller('immigration-visa-types')
export class ImmigrationVisaTypeController {
  constructor(
    private readonly immigrationVisaTypeService: ImmigrationVisaTypeService,
  ) {}

  @Post()
  @Roles('admin')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new immigration visa type',
    description: 'Creates a new immigration visa type with category, description, source, and country association',
  })
  @ApiBody({ type: CreateImmigrationVisaTypeDto })
  @ApiCreatedResponse({
    description: 'Immigration visa type created successfully',
    type: ImmigrationVisaTypeDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Country not found',
  })
  create(@Body() createImmigrationVisaTypeDto: CreateImmigrationVisaTypeDto) {
    return this.immigrationVisaTypeService.create(createImmigrationVisaTypeDto);
  }

  @Get()
  @AllowAnonymous()
  @ApiOperation({
    summary: 'Get all immigration visa types',
    description: 'Retrieves all immigration visa types, optionally filtered by country_id',
  })
  @ApiQuery({
    name: 'country_id',
    required: false,
    type: String,
    description: 'Country ID to filter immigration visa types',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Immigration visa types retrieved successfully',
    type: [ImmigrationVisaTypeDto],
  })
  findAll(@Query('country_id') country_id?: string) {
    return this.immigrationVisaTypeService.findAll(
      country_id ? { country_id } : undefined,
    );
  }

  @Get(':id')
  @AllowAnonymous()
  @ApiOperation({
    summary: 'Get immigration visa type by ID',
    description: 'Retrieves a specific immigration visa type by its ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Immigration visa type ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Immigration visa type found successfully',
    type: ImmigrationVisaTypeDto,
  })
  @ApiNotFoundResponse({
    description: 'Immigration visa type not found',
  })
  findOne(@Param('id') id: string) {
    return this.immigrationVisaTypeService.findOne(id);
  }

  @Patch(':id')
  @Roles('admin')
  @ApiOperation({
    summary: 'Update immigration visa type',
    description: 'Updates immigration visa type information by its ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Immigration visa type ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @ApiBody({ type: UpdateImmigrationVisaTypeDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Immigration visa type updated successfully',
    type: ImmigrationVisaTypeDto,
  })
  @ApiNotFoundResponse({
    description: 'Immigration visa type not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Country not found (if country_id is being updated)',
  })
  update(
    @Param('id') id: string,
    @Body() updateImmigrationVisaTypeDto: UpdateImmigrationVisaTypeDto,
  ) {
    return this.immigrationVisaTypeService.update(
      id,
      updateImmigrationVisaTypeDto,
    );
  }

  @Delete(':id')
  @Roles('admin')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete immigration visa type',
    description: 'Deletes an immigration visa type by its ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Immigration visa type ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @ApiNoContentResponse({
    description: 'Immigration visa type deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Immigration visa type not found',
  })
  remove(@Param('id') id: string) {
    return this.immigrationVisaTypeService.remove(id);
  }
}
