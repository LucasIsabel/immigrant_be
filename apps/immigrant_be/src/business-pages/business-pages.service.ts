import { Injectable } from '@nestjs/common';
import { BusinessPagesRepository } from './business-pages.repository';

@Injectable()
export class BusinessPagesService {
  constructor(private readonly repository: BusinessPagesRepository) {}

  async checkSlugAvailability(slug: string): Promise<{ available: boolean; slug: string }> {
    const taken = await this.repository.isSlugTaken(slug);
    return { available: !taken, slug };
  }
}
