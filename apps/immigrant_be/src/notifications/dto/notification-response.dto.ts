import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

/**
 * One notification, as the person who owns it sees it.
 *
 * Two columns the table has are deliberately absent. `userId` is the caller —
 * echoing it back tells them nothing they did not send. `status` is the SSE
 * transport's delivery state, which is bookkeeping between the poll and the
 * row: whether a socket has carried this yet is not the reader's business, and
 * publishing it would invite a client to reason about it.
 */
export class NotificationDto {
  @ApiProperty() id: string;

  @ApiProperty({
    description:
      'What happened. The frontend renders the sentence from this plus `payload`, so the notice speaks the language of whoever is reading it rather than the one it was written in.',
    example: 'business_page_approved',
  })
  type: string;

  @ApiPropertyOptional({
    nullable: true,
    description:
      'Prose written by a worker, Portuguese and admin-facing. Null on every user-facing type, which carries facts in `payload` instead.',
  })
  title: string | null;

  @ApiPropertyOptional({ nullable: true })
  message: string | null;

  @ApiPropertyOptional({
    nullable: true,
    type: 'object',
    additionalProperties: true,
    description:
      'The facts of what happened. Its shape depends on `type`; the contract is in `libs/notifications/src/notification-types.ts`.',
  })
  payload: Record<string, unknown> | null;

  @ApiPropertyOptional({
    nullable: true,
    description: 'Null means unread, and unread is what the badge counts.',
  })
  readAt: Date | null;

  @ApiProperty() createdAt: Date;
}

export class PaginatedNotificationsResponseDto {
  @ApiProperty({ type: [NotificationDto] })
  data: NotificationDto[];

  @ApiProperty({ example: 12 }) total: number;
  @ApiProperty({ example: 1 }) page: number;
  @ApiProperty({ example: 20 }) limit: number;
}

export class UnreadCountResponseDto {
  @ApiProperty({ example: 3, description: 'Rows whose `readAt` is null.' })
  count: number;
}

export class ReadAllResponseDto {
  @ApiProperty({
    example: 3,
    description: 'How many were unread a moment ago. Zero is a normal answer.',
  })
  updated: number;
}
