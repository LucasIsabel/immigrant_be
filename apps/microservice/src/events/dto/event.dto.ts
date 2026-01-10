export enum NotificationStatus {
  pending = 'pending',
  delivered = 'delivered',
  failed = 'failed',
}

export class EventDto {
  id: string;
  user_id: string;
  type: string;
  title: string | null;
  message: string | null;
  payload: Record<string, any> | null;
  status: NotificationStatus;
  created_at: Date;
  updated_at: Date;
}
