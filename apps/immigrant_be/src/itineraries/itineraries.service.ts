import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Prisma } from '../../../../generated/prisma';
import { normalizeCity } from '../business/city-key';
import { NotificationsService } from '@app/notifications/notifications.service';
import { USER_NOTIFICATION_TYPES } from '@app/notifications/notification-types';
import { buildItinerarySlugBase } from './itinerary-slug';
import { MAX_CREATED_ITINERARIES_PER_COUNTRY } from './itineraries.constants';
import { CreateItineraryDto } from './dto/create-itinerary.dto';
import {
  type ItineraryRow,
  ItinerariesRepository,
  type StopRow,
} from './itineraries.repository';
import { AddItineraryStopDto } from './dto/add-itinerary-stop.dto';
import { AddItineraryStopResponseDto } from './dto/add-itinerary-stop.dto';
import { ListMyItinerariesQueryDto } from './dto/list-my-itineraries-query.dto';
import { ListReportedItinerariesQueryDto } from './dto/list-reported-itineraries-query.dto';
import {
  DismissReportsResponseDto,
  PaginatedReportedItinerariesResponseDto,
} from './dto/reported-itinerary.dto';
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
  MyItinerarySummaryDto,
  PaginatedMyItinerariesResponseDto,
} from './dto/itinerary-response.dto';
import { ReorderItineraryStopsDto } from './dto/reorder-itinerary-stops.dto';
import { UpdateItineraryDto } from './dto/update-itinerary.dto';
import { UpdateItineraryVisibilityDto } from './dto/update-itinerary-visibility.dto';
import {
  CopyItineraryConflictDto,
  CopyItineraryDto,
  CopyItineraryResponseDto,
} from './dto/copy-itinerary.dto';

@Injectable()
export class ItinerariesService {
  constructor(
    private readonly repository: ItinerariesRepository,
    private readonly notifications: NotificationsService,
  ) {}

  async listMine(
    userId: string,
    query: ListMyItinerariesQueryDto,
  ): Promise<PaginatedMyItinerariesResponseDto> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const [rows, total] = await this.repository.listOwned(
      userId,
      page,
      limit,
      // Upper-cased on the way in, because the column stores ISO2 upper and a
      // hand-typed `?countryCode=pt` should still find something.
      query.countryCode?.toUpperCase(),
    );

    return {
      data: rows.map((row) => this.toSummary(row)),
      total,
      page,
      limit,
    };
  }

  /**
   * The row as a list entry. Extracted so the admin report queue shows an
   * itinerary the same way its owner sees it — a second mapper would be a
   * second chance to leak `userId` into a response.
   */
  private toSummary(row: ItineraryRow): MyItinerarySummaryDto {
    const stops = row.stops.map((stop) => this.toStop(stop));

    return {
      id: row.id,
      slug: row.slug,
      title: row.title,
      countryCode: row.countryCode,
      cities: [...new Set(stops.filter((s) => s.available).map((s) => s.city))],
      stopCount: stops.filter((s) => s.available).length,
      unavailableStopCount: stops.filter((s) => !s.available).length,
      // The same rule the public listing uses, off the stops this already
      // walked to count them: no extra query, and an unavailable stop never
      // lends its photo to a cover the owner cannot show.
      coverImageUrl:
        stops.find((s) => s.available && s.imageUrl)?.imageUrl ?? null,
      isCopy: row.sourceItineraryId !== null,
      copiedAt: row.copiedAt,
      isPublic: row.isPublic,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }

  // ── Admin: the report queue ────────────────────────────────────────────

  /**
   * Public itineraries carrying a report nobody has answered.
   *
   * Reports have been written since the feature shipped and never read once —
   * the dialog said "received" and meant nothing. This is the screen that makes
   * the button true.
   */
  async listReported(
    query: ListReportedItinerariesQueryDto,
  ): Promise<PaginatedReportedItinerariesResponseDto> {
    const page = query.page ?? 1;
    const limit = query.limit ?? 20;
    const [rows, total] = await this.repository.listReported(page, limit);

    return {
      data: rows.map((row) => ({
        ...this.toSummary(row),
        reportCount: row._count.reports,
        reports: row.reports,
      })),
      total,
      page,
      limit,
    };
  }

  /**
   * Takes an itinerary out of public view.
   *
   * The reports are deliberately **left open**. Taking something down does not
   * settle the complaint, and the queue only lists public itineraries anyway,
   * so this leaves it — which means that if the owner makes it public again it
   * comes straight back in front of an admin, carrying the same reports, rather
   * than returning quietly to a queue that has forgotten why it was there.
   *
   * Copies are untouched, and that is what makes this safe. A copy holds its
   * own stops — `sourceItineraryId` carries no relation and nothing
   * dereferences it — so somebody who saved this route keeps it whole.
   */
  async unpublish(id: string): Promise<MyItineraryResponseDto> {
    const row = await this.repository.findById(id);
    if (!row) throw new NotFoundException('Roteiro não encontrado');

    await this.repository.unpublish(id);

    return this.toResponse({ ...row, isPublic: false });
  }

  /**
   * Says the reports do not stand, and leaves the itinerary where it is.
   *
   * Without this the queue only grows: one report made in bad faith would keep
   * a perfectly good itinerary listed forever, and a queue nobody can empty is
   * one nobody reads.
   */
  async dismissReports(id: string): Promise<DismissReportsResponseDto> {
    const row = await this.repository.findById(id);
    if (!row) throw new NotFoundException('Roteiro não encontrado');

    return { dismissed: await this.repository.dismissReports(id) };
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
   * The one place an itinerary is written, whichever door it came through.
   *
   * The count is derived, never stored: a counter would be a second truth to
   * keep in step with every delete and every cascaded account, and counting to
   * three over an indexed column costs nothing.
   *
   * The count and the insert are not locked against each other, and the size of
   * that hole was measured rather than guessed: see the constant's comment. In
   * short, it holds against the mistake and not against the attempt, and the
   * ceiling is documented as the former.
   */
  private async createOwned(
    userId: string,
    countryCode: string,
    title: string,
  ): Promise<ItineraryRow> {
    const created = await this.repository.countCreatedInCountry(
      userId,
      countryCode,
    );
    if (created >= MAX_CREATED_ITINERARIES_PER_COUNTRY) {
      throw new UnprocessableEntityException(
        `Limite de ${MAX_CREATED_ITINERARIES_PER_COUNTRY} roteiros por país`,
      );
    }

    return this.repository.create({
      userId,
      slug: await this.buildUniqueSlug(title),
      title,
      countryCode,
    });
  }

  async create(
    userId: string,
    dto: CreateItineraryDto,
  ): Promise<MyItineraryResponseDto> {
    const itinerary = await this.createOwned(
      userId,
      dto.countryCode.toUpperCase(),
      dto.title,
    );
    return this.toResponse(itinerary);
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

    if (dto.startNew && dto.itineraryId) {
      throw new BadRequestException(
        'startNew e itineraryId pedem coisas diferentes',
      );
    }

    let itinerary: ItineraryRow | null = null;
    let created = false;

    if (dto.itineraryId) {
      itinerary = await this.mustOwn(dto.itineraryId, userId);
      if (itinerary.countryCode !== countryCode) {
        throw new BadRequestException(
          'A parada é de outro país que não o do roteiro',
        );
      }
    } else if (dto.startNew) {
      /*
       * The picker's "new itinerary", in one call rather than two. Creating
       * first and adding after would leave an empty itinerary behind whenever
       * the stop failed — and the target was already resolved above, so by the
       * time we write there is nothing left that can refuse.
       */
      itinerary = await this.createOwned(userId, countryCode, dto.defaultTitle);
      created = true;
    } else {
      itinerary = await this.repository.findMostRecentInCountry(
        userId,
        countryCode,
      );
      if (!itinerary) {
        itinerary = await this.createOwned(
          userId,
          countryCode,
          dto.defaultTitle,
        );
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

    await this.repository.deleteStop(stopId, id);
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
   * Take somebody else's public itinerary and make one of your own.
   *
   * Nothing links the copy back to the source, and that is the requirement
   * rather than a shortcut: the copy holds its own stop rows pointing straight
   * at the places and businesses, so the original being unpublished — or
   * deleted, taking its own rows with it — cannot reach it. A reference would
   * have made the copy exactly as fragile as the thing it was meant to
   * outlive.
   *
   * Only the stops a visitor can see are copied, renumbered by the order they
   * are passed in. Copying a hole would hand somebody a route with a gap they
   * did not choose and cannot explain.
   *
   * The copy is private. It is the reader's own itinerary from the first
   * second — publishing somebody else's route under your name is a decision,
   * and it is not one this endpoint gets to make for them.
   */
  async copyPublic(
    slug: string,
    userId: string,
    dto: CopyItineraryDto = {},
  ): Promise<CopyItineraryResponseDto> {
    const source = await this.mustBePublic(slug);

    const stops = source.stops
      .filter((stop) => this.toStop(stop).available)
      .map((stop) => ({
        placeId: stop.placeId,
        businessId: stop.businessId,
        city: stop.city,
        /*
         * Derived again rather than read across: `cityKey` is only ever
         * compared against `normalizeCity(filter)` computed at query time, so
         * a key written under an older normalisation is already unfindable.
         * Re-deriving means the copy answers the city filter the way a stop
         * added today would, instead of inheriting a key that no longer
         * matches anything.
         */
        cityKey: normalizeCity(stop.city),
      }));

    /*
     * A public itinerary can reach zero available stops without leaving the
     * public detail: the listing requires one, `findPublicBySlug` does not, so
     * the page still opens on an empty list. Copying that would put an empty
     * itinerary in somebody's dashboard, which reads as a failed copy rather
     * than as a faithful one.
     */
    if (stops.length === 0) {
      throw new BadRequestException(
        'Este roteiro já não tem paradas para copiar',
      );
    }

    /*
     * One copy per source per reader. The first request is the question: if a
     * copy is in the way it answers 409 and **writes nothing**, so the reader
     * decides before anything is destroyed rather than after. Their answer
     * comes back as `overwrite`.
     */
    const existing = await this.repository.findCopyOf(userId, source.id);
    if (existing) {
      if (!dto.overwrite) {
        throw new ConflictException(this.copyConflict(existing));
      }

      const updated = await this.repository.overwriteCopy(existing.id, {
        title: source.title,
        stops,
      });

      return {
        id: updated.id,
        slug: updated.slug,
        title: updated.title,
        overwritten: true,
      };
    }

    try {
      const copy = await this.repository.copy({
        userId,
        slug: await this.buildUniqueSlug(source.title),
        title: source.title,
        countryCode: source.countryCode,
        sourceItineraryId: source.id,
        stops,
      });

      await this.notifyAuthorOfCopy(source, userId);

      return {
        id: copy.id,
        slug: copy.slug,
        title: copy.title,
        overwritten: false,
      };
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        /*
         * Two first-copies arriving together: the loser re-reads and answers
         * the same question the winner's copy now poses, so the second tab
         * sees the confirmation dialog instead of an error it cannot act on.
         */
        const raced = await this.repository.findCopyOf(userId, source.id);
        throw new ConflictException(
          raced ? this.copyConflict(raced) : 'Já tens uma cópia deste roteiro',
        );
      }
      throw error;
    }
  }

  /**
   * Tells the author somebody took a copy — once, and only when there is
   * somebody else to tell.
   *
   * Two silences are deliberate. Copying your own itinerary notifies nobody:
   * it is a duplicate you asked for, not an audience. And overwriting an
   * existing copy notifies nobody either — it is the same reader refreshing
   * what they already took, and reporting it again would turn one person's
   * habit into a stream of notices that all say the same thing.
   *
   * The payload describes the **source**, never the copy, and carries no
   * identity of whoever copied it: what the author gains is the knowledge that
   * their itinerary travelled, not a name to look up.
   */
  private async notifyAuthorOfCopy(
    source: ItineraryRow,
    copierId: string,
  ): Promise<void> {
    const owner = await this.repository.findOwnerId(source.id);
    if (!owner || owner.userId === copierId) return;

    await this.notifications.notify({
      userId: owner.userId,
      type: USER_NOTIFICATION_TYPES.ITINERARY_COPIED,
      payload: {
        itineraryId: source.id,
        title: source.title,
        slug: source.slug,
      },
    });
  }

  /**
   * The 409 body, describing the copy that is in the way.
   *
   * `editedSinceCopy` compares `updatedAt` with `copiedAt`, which is only
   * honest because every gesture that changes a copy now touches `updatedAt` —
   * renaming did already, reordering and removing a stop were fixed in #258
   * for exactly this.
   *
   * Strictly greater, with no tolerance, because the repository stamps
   * `copiedAt` **from** `updatedAt` on every copy and overwrite — the two are
   * equal by construction the moment a copy is taken, so any later write makes
   * this true and nothing else does. A window here was tried and was wrong in
   * both directions: too tight and a fresh copy claims it was edited, too loose
   * and an edit 149 ms after copying is swallowed, which is the failure that
   * matters — the dialog would promise nothing will be lost while something is.
   */
  private copyConflict(existing: ItineraryRow): CopyItineraryConflictDto {
    const edited =
      existing.copiedAt !== null &&
      existing.updatedAt.getTime() > existing.copiedAt.getTime();

    return {
      message: 'Já tens uma cópia deste roteiro',
      existingCopy: {
        id: existing.id,
        title: existing.title,
        copiedAt: existing.copiedAt as Date,
        editedSinceCopy: edited,
      },
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
          imageUrl: this.stopPhoto(business.photos),
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
  /**
   * The photo a business stop shows, or null.
   *
   * `photos` is an array the owner controls and it can hold a blank string, so
   * the first entry is not necessarily a URL. Asking for the first one that is
   * not blank keeps a stop from claiming a photo it cannot draw.
   */
  private stopPhoto(photos: string[]): string | null {
    return photos.find((photo) => photo.trim().length > 0) ?? null;
  }

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
      imageUrl: this.stopPhoto(business.photos),
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
      isCopy: row.sourceItineraryId !== null,
      copiedAt: row.copiedAt,
      isPublic: row.isPublic,
      stops: row.stops.map((stop) => this.toStop(stop)),
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
    };
  }
}
