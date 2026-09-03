import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { CommunityEventStatus } from '../../../../../generated/prisma';
import { PublicCommunityEventDto } from './public-community-event.dto';

/**
 * Which half of the list: what is still to come, or what already happened.
 *
 * A separate enum from `CommunityEventWhen`, which slices the agenda by
 * calendar window (today, the weekend). This is a different axis — a favourite
 * is worth keeping after the fact, and "past" is not a window the public
 * agenda has any use for.
 */
export enum FavouriteEventsWhen {
  UPCOMING = 'upcoming',
  PAST = 'past',
}

export class ListFavouriteEventsQueryDto {
  @ApiPropertyOptional({
    enum: FavouriteEventsWhen,
    default: FavouriteEventsWhen.UPCOMING,
  })
  @IsOptional()
  @IsEnum(FavouriteEventsWhen)
  when?: FavouriteEventsWhen = FavouriteEventsWhen.UPCOMING;

  @ApiPropertyOptional({ default: 1, minimum: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 20, minimum: 1, maximum: 100 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 20;
}

/**
 * A favourite carries the event's status, which the public agenda never needs.
 *
 * Everything the agenda lists is approved by definition. A favourite outlives
 * that: the organizer can cancel, or a moderator can pull the event down, and
 * the row stays. Dropping it from the list would look like the favourite was
 * lost; saying `CANCELLED` tells the person the thing is off, which is what
 * they actually need to know before they turn up.
 */
export class FavouriteEventDto extends PublicCommunityEventDto {
  @ApiProperty({ enum: CommunityEventStatus })
  status: CommunityEventStatus;
}

export class PaginatedFavouriteEventsResponseDto {
  @ApiProperty({ type: [FavouriteEventDto] })
  data: FavouriteEventDto[];

  @ApiProperty({ example: 42 })
  total: number;

  @ApiProperty({ example: 1 })
  page: number;

  @ApiProperty({ example: 20 })
  limit: number;
}

/** What the toggle answers, so the caller never has to re-read to know. */
export class FavouriteEventResponseDto {
  @ApiProperty({
    description:
      'Estado depois da chamada. Favoritar duas vezes responde `true` das duas vezes.',
  })
  favourited: boolean;
}
