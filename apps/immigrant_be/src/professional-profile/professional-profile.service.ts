import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfessionalProfileRepository } from './professional-profile.repository';
import { UpsertProfessionalProfileDto } from './dto/upsert-professional-profile.dto';

@Injectable()
export class ProfessionalProfileService {
  constructor(private readonly repository: ProfessionalProfileRepository) {}

  getMyProfile(userId: string) {
    return this.repository.findByUserId(userId);
  }

  upsertProfile(userId: string, dto: UpsertProfessionalProfileDto) {
    return this.repository.upsert(userId, dto);
  }

  async getPublicProfile(userId: string) {
    const profile = await this.repository.findPublicByUserId(userId);
    if (!profile || !profile.isPublic) {
      throw new NotFoundException('Perfil profissional não encontrado');
    }
    return profile;
  }
}
