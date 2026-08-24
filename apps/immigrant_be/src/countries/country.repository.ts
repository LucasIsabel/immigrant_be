import { PrismaService } from '@app/database';
import { Injectable } from '@nestjs/common';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { UpsertCountryTranslationDto } from './dto/upsert-country-translation.dto';

@Injectable()
export class CountryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCountryDto: CreateCountryDto) {
    const { translations, ...country } = createCountryDto;

    return this.prisma.country.create({
      data: {
        ...country,
        // Nested write so the country and its copy land in the same
        // transaction — a country without translations renders blank in every
        // language, and there is no partial state worth persisting.
        translations: {
          create: translations,
        },
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
    const country = await this.prisma.country.findUnique({
      where: { id },
      include: {
        translations: true,
        immigration_visa_types: true,
      },
    });

    if (!country) return country;

    const counts = await this.countStepsByVisaType(
      country.immigration_visa_types.map((v) => v.id),
    );

    return {
      ...country,
      immigration_visa_types: country.immigration_visa_types.map((visa) => ({
        ...visa,
        steps_count: counts.get(visa.id) ?? 0,
      })),
    };
  }

  /**
   * Quantas etapas cada tipo de visto gera.
   *
   * Não é `count(visa_steps)`: aquela tabela tem **uma linha por idioma**, e
   * contá-las devolveria 3, não o número de tarefas. As etapas moram num JSON
   * agrupado por categoria (`{ core_documents: [...], education: [...] }`), e o
   * total é a soma dos tamanhos desses arrays.
   *
   * Feito em SQL para não trazer o JSON inteiro de três idiomas por visto só
   * para contar. `DISTINCT ON` pega um idioma qualquer: a contagem é a mesma em
   * todos, porque são traduções das mesmas etapas.
   */
  private async countStepsByVisaType(
    visaTypeIds: string[],
  ): Promise<Map<string, number>> {
    if (visaTypeIds.length === 0) return new Map();

    const rows = await this.prisma.$queryRaw<
      Array<{ visa_type_id: string; steps_count: bigint }>
    >`
      SELECT visa_type_id,
             COALESCE(
               (SELECT sum(jsonb_array_length(value))
                  FROM jsonb_each(steps)
                 WHERE jsonb_typeof(value) = 'array'),
               0
             ) AS steps_count
        FROM (
          SELECT DISTINCT ON (visa_type_id) visa_type_id, steps
            FROM visa_steps
           WHERE visa_type_id = ANY(${visaTypeIds}::uuid[])
           ORDER BY visa_type_id, language
        ) AS um_idioma_por_visto
    `;

    return new Map(rows.map((r) => [r.visa_type_id, Number(r.steps_count)]));
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

  async upsertTranslation(
    countryId: string,
    language: string,
    data: UpsertCountryTranslationDto,
  ) {
    return this.prisma.countryTranslation.upsert({
      where: {
        country_id_language: { country_id: countryId, language },
      },
      create: {
        country_id: countryId,
        language,
        ...data,
      },
      update: {
        ...data,
      },
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
