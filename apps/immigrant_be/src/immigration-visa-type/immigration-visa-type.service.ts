import { Injectable, NotFoundException } from '@nestjs/common';
import { ImmigrationVisaTypeRepository } from './immigration-visa-type.repository';
import { CountryService } from '../countries/country.service';
import { CreateImmigrationVisaTypeDto } from './dto/create-immigration-visa-type.dto';
import { UpdateImmigrationVisaTypeDto } from './dto/update-immigration-visa-type.dto';

@Injectable()
export class ImmigrationVisaTypeService {
  constructor(
    private readonly immigrationVisaTypeRepository: ImmigrationVisaTypeRepository,
    private readonly countryService: CountryService,
  ) {}

  async create(dto: CreateImmigrationVisaTypeDto) {
    // Validate that the country exists before creating
    await this.countryService.findOne(dto.country_id);

    return this.immigrationVisaTypeRepository.create(dto);
  }

  findAll(filters?: { country_id?: string }) {
    return this.immigrationVisaTypeRepository.findAll(filters);
  }

  async findOne(id: string) {
    const immigrationVisaType =
      await this.immigrationVisaTypeRepository.findOne(id);

    if (!immigrationVisaType) {
      throw new NotFoundException('Immigration visa type not found');
    }

    return immigrationVisaType;
  }

  async update(id: string, dto: UpdateImmigrationVisaTypeDto) {
    // Validate that the immigration visa type exists
    const existing = await this.immigrationVisaTypeRepository.findOne(id);

    if (!existing) {
      throw new NotFoundException('Immigration visa type not found');
    }

    // If country_id is being updated, validate that the new country exists
    if (dto.country_id) {
      await this.countryService.findOne(dto.country_id);
    }

    return this.immigrationVisaTypeRepository.update(id, dto);
  }

  async remove(id: string) {
    // Validate that the immigration visa type exists before deleting
    const existing = await this.immigrationVisaTypeRepository.findOne(id);

    if (!existing) {
      throw new NotFoundException('Immigration visa type not found');
    }

    return this.immigrationVisaTypeRepository.remove(id);
  }
}
