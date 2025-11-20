import { useMutation, useQuery } from '@tanstack/react-query';
import { getNotifications, patchReadNotification } from './api';
import { queryClient } from '@/shared/lib';

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
