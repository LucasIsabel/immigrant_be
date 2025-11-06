import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';

@ApiTags('Countries')
@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new country',
    description: 'Creates a new country with immigration information',
  })
  @ApiBody({ type: CreateCountryDto })
  @ApiCreatedResponse({
    description: 'Country created successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        flag: { type: 'string' },
        region: { type: 'string' },
        difficulty: { type: 'string' },
        difficultyScore: { type: 'number' },
        visaOptions: { type: 'array', items: { type: 'string' } },
        processingTime: { type: 'string' },
        investmentRequired: { type: 'string' },
        languageRequirement: { type: 'string' },
        jobMarket: { type: 'string' },
        benefits: { type: 'array', items: { type: 'string' } },
        challenges: { type: 'array', items: { type: 'string' } },
        popularCities: { type: 'array', items: { type: 'string' } },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  create(@Body() createCountryDto: CreateCountryDto) {
    return this.countryService.create(createCountryDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all countries',
    description: 'Retrieves all countries with their immigration information',
  })
  @ApiResponse({
    status: 200,
    description: 'Countries retrieved successfully',
    schema: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          flag: { type: 'string' },
          region: { type: 'string' },
          difficulty: { type: 'string' },
          difficultyScore: { type: 'number' },
          visaOptions: { type: 'array', items: { type: 'string' } },
          processingTime: { type: 'string' },
          investmentRequired: { type: 'string' },
          languageRequirement: { type: 'string' },
          jobMarket: { type: 'string' },
          benefits: { type: 'array', items: { type: 'string' } },
          challenges: { type: 'array', items: { type: 'string' } },
          popularCities: { type: 'array', items: { type: 'string' } },
          descriptions: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                language: { type: 'string' },
                description: { type: 'string' },
                countryId: { type: 'string' },
              },
            },
          },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
    },
  })
  @AllowAnonymous()
  findAll() {
    return this.countryService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get country by ID',
    description: 'Retrieves a specific country by its ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Country ID',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Country found successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        flag: { type: 'string' },
        region: { type: 'string' },
        difficulty: { type: 'string' },
        difficultyScore: { type: 'number' },
        visaOptions: { type: 'array', items: { type: 'string' } },
        processingTime: { type: 'string' },
        investmentRequired: { type: 'string' },
        languageRequirement: { type: 'string' },
        jobMarket: { type: 'string' },
        benefits: { type: 'array', items: { type: 'string' } },
        challenges: { type: 'array', items: { type: 'string' } },
        popularCities: { type: 'array', items: { type: 'string' } },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Country not found',
  })
  findOne(@Param('id') id: string) {
    return this.countryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Update country information',
    description: 'Updates country information by its ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Country ID',
    example: 1,
  })
  @ApiBody({ type: UpdateCountryDto })
  @ApiResponse({
    status: 200,
    description: 'Country updated successfully',
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number' },
        name: { type: 'string' },
        flag: { type: 'string' },
        region: { type: 'string' },
        difficulty: { type: 'string' },
        difficultyScore: { type: 'number' },
        visaOptions: { type: 'array', items: { type: 'string' } },
        processingTime: { type: 'string' },
        investmentRequired: { type: 'string' },
        languageRequirement: { type: 'string' },
        jobMarket: { type: 'string' },
        benefits: { type: 'array', items: { type: 'string' } },
        challenges: { type: 'array', items: { type: 'string' } },
        popularCities: { type: 'array', items: { type: 'string' } },
        createdAt: { type: 'string', format: 'date-time' },
        updatedAt: { type: 'string', format: 'date-time' },
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Country not found',
  })
  update(@Param('id') id: string, @Body() updateCountryDto: UpdateCountryDto) {
    return this.countryService.update(id, updateCountryDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({
    summary: 'Delete country',
    description: 'Deletes a country by its ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Country ID',
    example: 1,
  })
  @ApiNoContentResponse({
    description: 'Country deleted successfully',
  })
  @ApiNotFoundResponse({
    description: 'Country not found',
  })
  remove(@Param('id') id: string) {
    return this.countryService.remove(id);
  }
}
