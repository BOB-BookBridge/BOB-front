export interface NotificationData {
  id: number;
  type: NotificationType;
  refId: number;
  body: string;
  isRead: boolean;
  createdAt: string;
}

export type NotificationType = 'TRADE';
