import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { normalizeCity } from '../business/city-key';
import { buildItinerarySlugBase } from './itinerary-slug';
import {
  type ItineraryRow,
  ItinerariesRepository,
  type StopRow,
} from './itineraries.repository';
import { AddItineraryStopDto } from './dto/add-itinerary-stop.dto';
import { AddItineraryStopResponseDto } from './dto/add-itinerary-stop.dto';
import { ListMyItinerariesQueryDto } from './dto/list-my-itineraries-query.dto';
import { ListPublicItinerariesQueryDto } from './dto/list-public-itineraries-query.dto';
import {
  PaginatedPublicItinerariesResponseDto,
  PublicItineraryResponseDto,
  PublicItineraryStopDto,
} from './dto/public-itinerary.dto';
import {
  ReportItineraryDto,
  ReportItineraryResponseDto,
} from './dto/report-itinerary.dto';
import {
  MyItineraryResponseDto,
  MyItineraryStopDto,
  PaginatedMyItinerariesResponseDto,
} from './dto/itinerary-response.dto';
import { ReorderItineraryStopsDto } from './dto/reorder-itinerary-stops.dto';
import { UpdateItineraryDto } from './dto/update-itinerary.dto';
import { UpdateItineraryVisibilityDto } from './dto/update-itinerary-visibility.dto';

@Injectable()
export class ItinerariesService {
  constructor(private readonly repository: ItinerariesRepository) {}

  async listMine(
    userId: string,
    query: ListMyItinerariesQueryDto,
  ): Promise<PaginatedMyItinerariesResponseDto> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const [rows, total] = await this.repository.listOwned(userId, page, limit);

    return {
      data: rows.map((row) => {
        const stops = row.stops.map((stop) => this.toStop(stop));
        return {
          id: row.id,
          slug: row.slug,
          title: row.title,
          countryCode: row.countryCode,
          cities: [
            ...new Set(stops.filter((s) => s.available).map((s) => s.city)),
          ],
          stopCount: stops.filter((s) => s.available).length,
          unavailableStopCount: stops.filter((s) => !s.available).length,
          isPublic: row.isPublic,
          createdAt: row.createdAt,
          updatedAt: row.updatedAt,
        };
      }),
      total,
      page,
      limit,
    };
  }

  async getMine(id: string, userId: string): Promise<MyItineraryResponseDto> {
    return this.toResponse(await this.mustOwn(id, userId));
  }

  async rename(
    id: string,
    userId: string,
    dto: UpdateItineraryDto,
  ): Promise<MyItineraryResponseDto> {
    await this.mustOwn(id, userId);
    // The slug is not rebuilt, on purpose: a link somebody already shared has
    // to keep resolving, and the title is the one field its owner may change
    // at any moment.
    return this.toResponse(
      await this.repository.update(id, { title: dto.title }),
    );
  }

  async setVisibility(
    id: string,
    userId: string,
    dto: UpdateItineraryVisibilityDto,
  ): Promise<MyItineraryResponseDto> {
    await this.mustOwn(id, userId);
    return this.toResponse(
      await this.repository.update(id, { isPublic: dto.isPublic }),
    );
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.mustOwn(id, userId);
    await this.repository.delete(id);
  }

  /**
   * Add a stop, creating the itinerary if this is the first one.
   *
   * The order of the checks is what makes it safe: the target is resolved
   * before anything is written, so a request naming a place that is not
   * addable never creates an itinerary as a side effect.
   */
  async addStop(
    userId: string,
    dto: AddItineraryStopDto,
  ): Promise<AddItineraryStopResponseDto> {
    const target = await this.resolveTarget(dto);
    const countryCode = dto.countryCode.toUpperCase();

    let itinerary: ItineraryRow | null = null;
    let created = false;

    if (dto.itineraryId) {
      itinerary = await this.mustOwn(dto.itineraryId, userId);
      if (itinerary.countryCode !== countryCode) {
        throw new BadRequestException(
          'A parada é de outro país que não o do roteiro',
        );
      }
    } else {
      itinerary = await this.repository.findMostRecentInCountry(
        userId,
        countryCode,
      );
      if (!itinerary) {
        itinerary = await this.repository.create({
          userId,
          slug: await this.buildUniqueSlug(dto.defaultTitle),
          title: dto.defaultTitle,
          countryCode,
        });
        created = true;
      }
    }

    const already = itinerary.stops.some((stop) =>
      target.kind === 'place'
        ? stop.placeId === target.id
        : stop.businessId === target.id,
    );
    if (already) {
      throw new ConflictException('Este item já está no roteiro');
    }

    const stop = await this.repository.addStop({
      itineraryId: itinerary.id,
      placeId: target.kind === 'place' ? target.id : null,
      businessId: target.kind === 'business' ? target.id : null,
      city: target.city,
      cityKey: normalizeCity(target.city),
    });

    return {
      itineraryId: itinerary.id,
      itineraryTitle: itinerary.title,
      created,
      stopId: stop.id,
      position: stop.position,
    };
  }

  async removeStop(
    id: string,
    stopId: string,
    userId: string,
  ): Promise<MyItineraryResponseDto> {
    const itinerary = await this.mustOwn(id, userId);
    if (!itinerary.stops.some((stop) => stop.id === stopId)) {
      throw new NotFoundException('Parada não encontrada');
    }

    await this.repository.deleteStop(stopId);
    // Positions are left with the gap the removal opened. They are an order,
    // not an index: renumbering here would be a second write for a difference
    // nobody can see, and the next reorder rewrites them anyway.
    return this.toResponse(await this.mustOwn(id, userId));
  }

  /**
   * Reorder by set equality, never by prefix.
   *
   * A list that is missing a stop, repeats one, or names a stranger's is
   * refused outright rather than applied partially. Half an order is worse
   * than none: it is wrong and it looks deliberate.
   */
  async reorderStops(
    id: string,
    userId: string,
    dto: ReorderItineraryStopsDto,
  ): Promise<MyItineraryResponseDto> {
    const itinerary = await this.mustOwn(id, userId);

    const current = itinerary.stops.map((stop) => stop.id);
    const incoming = dto.stopIds;

    const sameSize = current.length === incoming.length;
    const noRepeats = new Set(incoming).size === incoming.length;
    const sameMembers = incoming.every((stopId) => current.includes(stopId));

    if (!sameSize || !noRepeats || !sameMembers) {
      throw new BadRequestException(
        'A ordem tem de conter exatamente as paradas do roteiro, uma vez cada',
      );
    }

    await this.repository.reorderStops(id, incoming);
    return this.toResponse(await this.mustOwn(id, userId));
  }

  // ── Public ─────────────────────────────────────────────────────────

  async listPublic(
    query: ListPublicItinerariesQueryDto,
  ): Promise<PaginatedPublicItinerariesResponseDto> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const [rows, total] = await this.repository.listPublic(
      { countryCode: query.countryCode, city: query.city },
      (page - 1) * limit,
      limit,
    );

    return {
      data: rows.map((row) => {
        const stops = this.publicStops(row);
        return {
          slug: row.slug,
          title: row.title,
          countryCode: row.countryCode,
          cities: [...new Set(stops.map((stop) => stop.city))],
          stopCount: stops.length,
          // The first stop with a photo, not the first stop: a cover that is
          // blank because stop one happens to have no picture says nothing
          // about the itinerary behind it.
          coverImageUrl: stops.find((stop) => stop.imageUrl)?.imageUrl ?? null,
          createdAt: row.createdAt,
        };
      }),
      total,
      page,
      limit,
    };
  }

  async getPublic(slug: string): Promise<PublicItineraryResponseDto> {
    const itinerary = await this.mustBePublic(slug);

    return {
      slug: itinerary.slug,
      title: itinerary.title,
      countryCode: itinerary.countryCode,
      stops: this.publicStops(itinerary),
      createdAt: itinerary.createdAt,
    };
  }

  /**
   * Approval holds back what arrives; the report holds back what got through.
   *
   * A filled honeypot answers exactly like a real report — telling a bot it
   * was caught is telling it how to try again. Mold of the events report.
   */
  async report(
    slug: string,
    dto: ReportItineraryDto,
  ): Promise<ReportItineraryResponseDto> {
    const itinerary = await this.mustBePublic(slug);

    if (!dto.website) {
      await this.repository.createReport(itinerary.id, dto.reason);
    }

    return { received: true };
  }

  private async mustBePublic(slug: string): Promise<ItineraryRow> {
    const itinerary = await this.repository.findPublicBySlug(slug);
    if (!itinerary) {
      throw new NotFoundException('Roteiro não encontrado');
    }
    return itinerary;
  }

  /**
   * The stops a visitor sees, numbered as they will count them.
   *
   * Unavailable ones are dropped and the rest renumbered 1..n. The renumbering
   * happens **once, here**, and the same array feeds the list and the map, so
   * pin three is item three by construction rather than by two pieces of code
   * agreeing. Numbering before filtering would leave gaps; filtering in the
   * map alone would slide every later pin by one.
   *
   * A stop with no coordinate is a different case and stays: a business
   * registered before the form geocoded its address is still a real place to
   * go, and its address is on its own page. It simply cannot be a pin, so
   * `lat`/`lng` come back null and the map draws one fewer marker than the
   * list has rows — which is honest, where a shifted number would not be.
   */
  private publicStops(row: ItineraryRow): PublicItineraryStopDto[] {
    return row.stops
      .filter((stop) => this.toStop(stop).available)
      .map((stop, index) => {
        const place = stop.place;
        if (place) {
          return {
            id: stop.id,
            number: index + 1,
            kind: 'place' as const,
            name: place.name,
            city: stop.city,
            imageUrl: place.imageUrl,
            lat: place.lat,
            lng: place.lng,
            placeRef: {
              countryCode: place.countryCode,
              city: place.city,
              slug: place.slug,
            },
            businessPageSlug: null,
          };
        }

        const business = stop.business as NonNullable<typeof stop.business>;
        const page = business.businessPage;
        return {
          id: stop.id,
          number: index + 1,
          kind: 'business' as const,
          name: business.name,
          city: stop.city,
          imageUrl: null,
          lat: business.lat,
          lng: business.lng,
          placeRef: null,
          // Only an approved page is reachable; handing out the slug of a page
          // still in review would link the visitor to a 404.
          businessPageSlug:
            page &&
            (page.status === 'APPROVED' ||
              page.status === 'APPROVED_WITH_PENDING')
              ? page.slug
              : null,
        };
      });
  }

  /**
   * 404, never 403, for somebody else's itinerary.
   *
   * Telling a stranger that an id exists but is not theirs is an answer they
   * did not earn — it turns the endpoint into a way to confirm that a given
   * itinerary exists.
   */
  private async mustOwn(id: string, userId: string): Promise<ItineraryRow> {
    const itinerary = await this.repository.findOwned(id, userId);
    if (!itinerary) {
      throw new NotFoundException('Roteiro não encontrado');
    }
    return itinerary;
  }

  private async resolveTarget(
    dto: AddItineraryStopDto,
  ): Promise<{ kind: 'place' | 'business'; id: string; city: string }> {
    const named = [dto.placeId, dto.businessId].filter(Boolean);
    if (named.length !== 1) {
      throw new BadRequestException(
        'Informe exatamente um de placeId ou businessId',
      );
    }

    if (dto.placeId) {
      const place = await this.repository.findAddablePlace(dto.placeId);
      if (!place) {
        throw new NotFoundException('Lugar não encontrado');
      }
      return { kind: 'place', id: place.id, city: place.city };
    }

    const business = await this.repository.findAddableBusiness(
      dto.businessId as string,
    );
    if (!business) {
      throw new NotFoundException('Negócio não encontrado');
    }
    return { kind: 'business', id: business.id, city: business.city };
  }

  private async buildUniqueSlug(title: string): Promise<string> {
    const base = buildItinerarySlugBase(title);

    let candidate = base;
    for (let attempt = 2; attempt <= 50; attempt++) {
      if (!(await this.repository.isSlugTaken(candidate))) {
        return candidate;
      }
      candidate = `${base}-${attempt}`;
    }

    // Fifty itineraries sharing a title is not a collision, it is a robot; a
    // random suffix keeps the write from looping forever.
    return `${base}-${Math.random().toString(36).slice(2, 8)}`;
  }

  /**
   * A stop is unavailable when its target went out of view — a place
   * deactivated or pulled from approval, a business its owner made private.
   * The owner still sees it, flagged, because a stop that vanished with no
   * explanation reads as data loss; the public read drops it instead.
   */
  private toStop(stop: StopRow): MyItineraryStopDto {
    if (stop.place) {
      return {
        id: stop.id,
        position: stop.position,
        kind: 'place',
        targetId: stop.place.id,
        name: stop.place.name,
        imageUrl: stop.place.imageUrl,
        lat: stop.place.lat,
        lng: stop.place.lng,
        city: stop.city,
        available:
          stop.place.isActive && stop.place.reviewStatus === 'APPROVED',
      };
    }

    const business = stop.business;
    if (!business) {
      // Unreachable: the CHECK in the migration guarantees exactly one target,
      // and both foreign keys cascade on delete. Throwing beats returning a
      // half-built stop that every reader downstream would have to doubt.
      throw new Error(`Itinerary stop ${stop.id} points at nothing`);
    }

    return {
      id: stop.id,
      position: stop.position,
      kind: 'business',
      targetId: business.id,
      name: business.name,
      imageUrl: null,
      lat: business.lat,
      lng: business.lng,
      city: stop.city,
      available: business.isPublic,
    };
  }

  private toResponse(row: ItineraryRow): MyItineraryResponseDto {
    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      countryCode: row.countryCode,
      isPublic: row.isPublic,
      stops: row.stops.map((stop) => this.toStop(stop)),
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }
}
