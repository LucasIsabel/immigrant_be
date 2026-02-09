import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  IsUUID,
} from 'class-validator';

export enum NotificationStatus {
  pending = 'pending',
  delivered = 'delivered',
  failed = 'failed',
}

export class CreateEventDto {
  @ApiProperty({
    description: 'User ID who owns the event',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  @IsUUID()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({
    description: 'Type of the event',
    example: 'plan-created',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({
    description: 'Title of the event',
    example: 'Plan Created Successfully',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'Message content of the event',
    example: 'Your immigration plan has been created successfully',
    type: String,
    required: false,
  })
  @IsString()
  @IsOptional()
  message?: string;

  @ApiProperty({
    description: 'Additional payload data as JSON',
    example: { planId: '123e4567-e89b-12d3-a456-426614174000' },
    type: Object,
    required: false,
  })
  @IsOptional()
  payload?: unknown;

  @ApiProperty({
    description: 'Status of the notification',
    enum: NotificationStatus,
    example: NotificationStatus.pending,
    default: NotificationStatus.pending,
    required: false,
  })
  @IsEnum(NotificationStatus)
  @IsOptional()
  status?: NotificationStatus;
}

export class EventResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the event',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  id: string;

  @ApiProperty({
    description: 'User ID who owns the event',
    example: '123e4567-e89b-12d3-a456-426614174000',
    type: String,
  })
  user_id: string;

  @ApiProperty({
    description: 'Type of the event',
    example: 'plan-created',
    type: String,
  })
  type: string;

  @ApiProperty({
    description: 'Title of the event',
    example: 'Plan Created Successfully',
    type: String,
    nullable: true,
  })
  title: string | null;

  @ApiProperty({
    description: 'Message content of the event',
    example: 'Your immigration plan has been created successfully',
    type: String,
    nullable: true,
  })
  message: string | null;

  @ApiProperty({
    description: 'Additional payload data as JSON',
    example: { planId: '123e4567-e89b-12d3-a456-426614174000' },
    type: Object,
    nullable: true,
  })
  payload: unknown | null;

  @ApiProperty({
    description: 'Status of the notification',
    enum: NotificationStatus,
    example: NotificationStatus.pending,
  })
  status: NotificationStatus;

  @ApiProperty({
    description: 'Event creation timestamp',
    example: '2024-01-15T10:30:00Z',
    type: Date,
  })
  created_at: Date;

  @ApiProperty({
    description: 'Event last update timestamp',
    example: '2024-01-15T10:30:00Z',
    type: Date,
  })
  updated_at: Date;
}
