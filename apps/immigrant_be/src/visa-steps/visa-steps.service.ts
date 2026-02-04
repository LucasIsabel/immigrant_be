import { Injectable, NotFoundException } from '@nestjs/common';
import { VisaStepsRepository } from './visa-steps.repository';
import { CreateVisaStepsDto } from './dto/create-visa-steps.dto';
import { UpdateVisaStepsDto } from './dto/update-visa-steps.dto';
import { Prisma } from 'generated/prisma';

@Injectable()
export class VisaStepsService {
  constructor(private readonly visaStepsRepository: VisaStepsRepository) {}

  create(dto: CreateVisaStepsDto) {
    const data: Prisma.VisaStepsCreateInput = {
      language: dto.language,
      steps: dto.steps,
      visa_type: {
        connect: { id: dto.visa_type_id },
      },
    };

    return this.visaStepsRepository.create(data);
  }

  findAll(filters: { visa_type_id?: string; language?: string }) {
    return this.visaStepsRepository.findAll(filters);
  }

  async update(id: string, dto: UpdateVisaStepsDto) {
    const existing = await this.visaStepsRepository.findById(id);

    if (!existing) {
      throw new NotFoundException('Visa steps not found');
    }

    const data: Prisma.VisaStepsUpdateInput = {
      language: dto.language,
      steps: dto.steps,
    };

    return this.visaStepsRepository.update(id, data);
  }
}
