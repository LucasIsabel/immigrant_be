import { PrismaService } from '@app/database';
import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

@Injectable()
export class CountryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCountryDto: CreateCountryDto) {
    return this.prisma.country.create({
      data: {
        ...createCountryDto,
      },
      include: {
        translations: true,
      },
    });
  }

  async findAllNames(): Promise<Array<{ name: string }>> {
    return this.prisma.country.findMany({
      select: {
        name: true,
      },
    });
  }

  async findAll() {
    return this.prisma.country.findMany({
      include: {
        translations: true,
      },
    });
  }

  async findOne(id: string) {
    return await this.prisma.country.findUnique({
      where: { id },
      include: {
        translations: true,
        immigration_visa_types: true,
      },
    });
  }

  async findOneByName(name: string) {
    return this.prisma.country.findUnique({
      where: { name },
      include: {
        translations: true,
      },
    });
  }

  async update(id: string, updateCountryDto: UpdateCountryDto) {
    return this.prisma.country.update({
      where: { id },
      data: {
        ...updateCountryDto,
      },
      include: {
        translations: true,
      },
    });
  }

  async remove(id: string) {
    return await this.prisma.country.delete({
      where: { id },
    });
  }

  async getVisaTypes(countryId: string) {
    return this.prisma.immigrationVisaType.findMany({
      where: { country_id: countryId },
    });
  }

  async getById(id: string) {
    return this.prisma.country.findUnique({
      where: { id },
      include: {
        translations: true,
        immigration_visa_types: true,
      },
    });
  }
}
