import axiosInstance from '@/shared/config/axios';
import { NotificationModel } from './types';

export const getNotifications = async (): Promise<NotificationModel[]> => {
  const { data } = await axiosInstance.get('/notifications');
  return data;
};

export const patchReadNotification = async (notificationId: number) => {
  const { data } = await axiosInstance.patch(
    `/notifications/${notificationId}`,
  );
  return data;
};
