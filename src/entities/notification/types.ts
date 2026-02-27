import { User } from '../admin/reports';

export interface NotificationModel {
  id: number;
  type: NotificationType;
  refId: number;
  body: string;
  isRead: boolean;
  createdAt: string;
  sentAt?: string;
  sender?: User;
}

export type NotificationType = 'TRADE' | 'INQUIRY' | 'REPORT' | 'NOTICE';
