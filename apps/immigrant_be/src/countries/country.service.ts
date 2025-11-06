import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { CountryRepository } from './country.repository';

@Injectable()
export class CountryService {
  constructor(private readonly countryRepository: CountryRepository) {}

  async create(createCountryDto: CreateCountryDto) {
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
}
