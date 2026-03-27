import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { CountriesNowService } from './countriesnow.service';
import { CountriesNowCountryDto } from './dto/countries-now-country.dto';
import { CountriesNowCurrencyDto } from './dto/countries-now-currency.dto';
import { CountriesNowStateDto } from './dto/countries-now-state.dto';

@ApiTags('CountriesNow')
@Controller('countriesnow')
export class CountriesNowController {
  constructor(private readonly countriesNowService: CountriesNowService) {}

  @Get('countries')
  @AllowAnonymous()
  @ApiOperation({
    summary: 'List countries with cities',
    description:
      'Proxy to CountriesNow public API with server-side cache (24h). Used by My City and business forms.',
  })
  @ApiOkResponse({
    description: 'Countries and city names',
    type: [CountriesNowCountryDto],
  })
  getCountries(): Promise<CountriesNowCountryDto[]> {
    return this.countriesNowService.getCountries();
  }

  @Get('states')
  @AllowAnonymous()
  @ApiOperation({
    summary: 'List states for a country',
    description:
      'Proxy to CountriesNow states endpoint with server-side cache (24h).',
  })
  @ApiQuery({
    name: 'country',
    required: true,
    description: 'Country name as in CountriesNow (e.g. Portugal)',
    example: 'Portugal',
  })
  @ApiOkResponse({
    description:
      'State names (may be empty for countries without subdivisions)',
    type: [CountriesNowStateDto],
  })
  getStates(
    @Query('country') country: string,
  ): Promise<CountriesNowStateDto[]> {
    return this.countriesNowService.getStates(country);
  }

  @Get('cities')
  @AllowAnonymous()
  @ApiOperation({
    summary: 'List cities in a state',
    description:
      'Proxy to CountriesNow state/cities endpoint with server-side cache (24h).',
  })
  @ApiQuery({
    name: 'country',
    required: true,
    description: 'Country name',
    example: 'Portugal',
  })
  @ApiQuery({
    name: 'state',
    required: true,
    description: 'State / district / region name',
    example: 'Lisbon',
  })
  @ApiOkResponse({
    description: 'City names in the given state',
    schema: { type: 'array', items: { type: 'string' } },
  })
  getCities(
    @Query('country') country: string,
    @Query('state') state: string,
  ): Promise<string[]> {
    return this.countriesNowService.getCitiesInState(country, state);
  }

  @Get('currency')
  @AllowAnonymous()
  @ApiOperation({
    summary: 'Get currency for a country',
    description:
      'Uses CountriesNow currency endpoint; falls back to REST Countries by iso2 when needed.',
  })
  @ApiQuery({
    name: 'country',
    required: false,
    description: 'Country name (e.g. Portugal)',
    example: 'Portugal',
  })
  @ApiQuery({
    name: 'iso2',
    required: false,
    description: 'ISO 3166-1 alpha-2 (e.g. PT) for fallback',
    example: 'PT',
  })
  @ApiOkResponse({
    description: 'Primary currency code for the country',
    type: CountriesNowCurrencyDto,
  })
  @ApiNotFoundResponse({ description: 'Currency not found' })
  getCurrency(
    @Query('country') country?: string,
    @Query('iso2') iso2?: string,
  ): Promise<CountriesNowCurrencyDto> {
    return this.countriesNowService.getCurrency(country, iso2);
  }
}
