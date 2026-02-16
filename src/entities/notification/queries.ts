import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib';
import {
  getNotifications,
  patchReadAllNotification,
  patchReadNotification,
} from './api';

export const useNotificationQuery = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: () => getNotifications(),
  });
};

export const useReadNotificationMutation = () => {
  return useMutation({
    mutationFn: (notificationId: number) =>
      patchReadNotification(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};

export const useReadAllNotificationMutation = () => {
  return useMutation({
    mutationFn: () => patchReadAllNotification(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    },
  });
};
