import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { UpsertCountryTranslationDto } from './dto/upsert-country-translation.dto';
import { CountryRepository } from './country.repository';
import {
  DEFAULT_LANGUAGE,
  isSupportedLanguage,
  SUPPORTED_LANGUAGES,
} from './country-translation.util';

@Injectable()
export class CountryService {
  constructor(private readonly countryRepository: CountryRepository) {}

  async create(createCountryDto: CreateCountryDto) {
    this.assertTranslationsAreCoherent(createCountryDto.translations);

    return this.countryRepository.create(createCountryDto);
  }

  async findAllNames() {
    return this.countryRepository.findAllNames();
  }

  async findAll() {
    return this.countryRepository.findAll();
  }

  async findOne(id: string) {
    const country = await this.countryRepository.findOne(id);

    if (!country) {
      throw new NotFoundException('Country not found');
    }

    return country;
  }

  async findOneByName(name: string) {
    return await this.countryRepository.findOneByName(name);
  }

  async update(id: string, updateCountryDto: UpdateCountryDto) {
    const country = await this.countryRepository.findOne(id);

    if (!country) {
      throw new NotFoundException('Country not found');
    }

    return this.countryRepository.update(id, updateCountryDto);
  }

  async remove(id: string) {
    const country = await this.countryRepository.findOne(id);

    if (!country) {
      throw new NotFoundException('Country not found');
    }

    return this.countryRepository.remove(id);
  }

  async getVisaTypes(countryId: string) {
    return this.countryRepository.getVisaTypes(countryId);
  }

  async getCountryById(id: string) {
    return await this.countryRepository.getById(id);
  }

  async upsertTranslation(
    id: string,
    language: string,
    upsertCountryTranslationDto: UpsertCountryTranslationDto,
  ) {
    if (!isSupportedLanguage(language)) {
      throw new BadRequestException(
        `Unsupported language "${language}". Supported: ${SUPPORTED_LANGUAGES.join(', ')}`,
      );
    }

    const country = await this.countryRepository.findOne(id);

    if (!country) {
      throw new NotFoundException('Country not found');
    }

    return this.countryRepository.upsertTranslation(
      id,
      language,
      upsertCountryTranslationDto,
    );
  }

  /**
   * The DTO already restricts each `language` to the supported set; what it
   * cannot see is the shape of the list as a whole. Both rules below would
   * otherwise surface as a country that renders blank — the duplicate as a
   * unique-constraint 500, the missing fallback as silently empty copy for
   * every visitor whose language was never written.
   */
  private assertTranslationsAreCoherent(
    translations: CreateCountryDto['translations'],
  ) {
    const languages = translations.map((translation) => translation.language);

    if (new Set(languages).size !== languages.length) {
      throw new BadRequestException(
        'Translations must not repeat the same language',
      );
    }

    if (!languages.includes(DEFAULT_LANGUAGE)) {
      throw new BadRequestException(
        `Translations must include the fallback language (${DEFAULT_LANGUAGE})`,
      );
    }
  }
}
