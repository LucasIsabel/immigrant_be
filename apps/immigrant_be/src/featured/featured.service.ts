import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '@app/database';
import { isFeaturedAt } from '../common/featured/featured';
import { FeatureResponseDto } from './dto/feature-response.dto';
import { FeaturableEntity, SetFeatureDto } from './dto/set-feature.dto';

@Injectable()
export class FeaturedService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Marca — ou desmarca — um item como destaque.
   *
   * Uma rota para três entidades porque destacar é um ato só: a faixa mistura
   * restaurantes, guias, eventos e clássicos, e três superfícies de admin
   * seriam três cópias da mesma decisão editorial.
   */
  async set(
    entity: FeaturableEntity,
    id: string,
    dto: SetFeatureDto,
  ): Promise<FeatureResponseDto> {
    // Espaço vendido sem fim é permanente por esquecimento — e o leitor
    // continua a ver "destaque" muito depois de a campanha ter acabado.
    if (dto.featureKind === 'PAID' && !dto.featuredUntil) {
      throw new BadRequestException(
        'Um destaque pago precisa de uma data de fim',
      );
    }
    if (
      dto.featuredFrom &&
      dto.featuredUntil &&
      dto.featuredFrom > dto.featuredUntil
    ) {
      throw new BadRequestException('O início do destaque é depois do fim');
    }

    const data = {
      featureKind: dto.featureKind ?? null,
      // Tirar o destaque leva as datas com ele: deixá-las para trás faz a
      // próxima marcação herdar uma janela que ninguém escolheu.
      featuredFrom: dto.featureKind ? (dto.featuredFrom ?? null) : null,
      featuredUntil: dto.featureKind ? (dto.featuredUntil ?? null) : null,
    };

    const updated = await this.update(entity, id, data);
    return {
      id: updated.id,
      featureKind: updated.featureKind,
      featuredFrom: updated.featuredFrom,
      featuredUntil: updated.featuredUntil,
      featuredNow: isFeaturedAt(updated),
    };
  }

  private async update(
    entity: FeaturableEntity,
    id: string,
    data: {
      featureKind: FeatureResponseDto['featureKind'];
      featuredFrom: Date | null;
      featuredUntil: Date | null;
    },
  ) {
    const select = {
      id: true,
      featureKind: true,
      featuredFrom: true,
      featuredUntil: true,
    };
    try {
      if (entity === FeaturableEntity.BUSINESS) {
        return await this.prisma.business.update({
          where: { id },
          data,
          select,
        });
      }
      if (entity === FeaturableEntity.PLACE) {
        return await this.prisma.place.update({ where: { id }, data, select });
      }
      return await this.prisma.communityEvent.update({
        where: { id },
        data,
        select,
      });
    } catch {
      throw new NotFoundException('Item não encontrado');
    }
  }
}
