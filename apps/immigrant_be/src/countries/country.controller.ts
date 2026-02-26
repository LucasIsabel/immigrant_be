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
  ApiCookieAuth,
  ApiForbiddenResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CountryService } from './country.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { CountryDto } from './dto/country.dto';
import { CountryDetailDto } from './dto/country-detail.dto';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/user-role.enum';

@ApiTags('Countries')
@Controller('countries')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.CREATED)
  @ApiCookieAuth('better-auth.session_token')
  @ApiOperation({
    summary: 'Create a new country',
    description: 'Creates a new country with immigration information',
  })
  @ApiBody({ type: CreateCountryDto })
  @ApiCreatedResponse({
    description: 'Country created successfully',
    type: CountryDto,
  })
  @ApiUnauthorizedResponse({ description: 'Authentication required' })
  @ApiForbiddenResponse({ description: 'Admin role required' })
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
    type: [CountryDto],
  })
  @AllowAnonymous()
  findAll() {
    return this.countryService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get country by ID',
    description:
      'Retrieves a specific country by its ID, including immigration visa types',
  })
  @ApiParam({
    name: 'id',
    description: 'Country ID',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @ApiResponse({
    status: 200,
    description: 'Country found successfully with visa types',
    type: CountryDetailDto,
  })
  @ApiNotFoundResponse({
    description: 'Country not found',
  })
  @AllowAnonymous()
  findOne(@Param('id') id: string) {
    return this.countryService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiCookieAuth('better-auth.session_token')
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
    type: CountryDto,
  })
  @ApiNotFoundResponse({
    description: 'Country not found',
  })
  @ApiUnauthorizedResponse({ description: 'Authentication required' })
  @ApiForbiddenResponse({ description: 'Admin role required' })
  update(@Param('id') id: string, @Body() updateCountryDto: UpdateCountryDto) {
    return this.countryService.update(id, updateCountryDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiCookieAuth('better-auth.session_token')
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
  @ApiUnauthorizedResponse({ description: 'Authentication required' })
  @ApiForbiddenResponse({ description: 'Admin role required' })
  remove(@Param('id') id: string) {
    return this.countryService.remove(id);
  }
}
