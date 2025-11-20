import axiosInstance from '@/shared/config/axios';
import { NotificationsRes } from './types';

export const getNotifications = async (): Promise<NotificationsRes> => {
  const { data } = await axiosInstance.get('/notifications');
  return data;
};

export const patchReadNotification = async (notificationId: number) => {
  const { data } = await axiosInstance.patch(
    `/notifications/${notificationId}`,
  );
  return data;
};
