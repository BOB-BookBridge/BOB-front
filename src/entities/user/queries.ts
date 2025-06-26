import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getMyProfile, patchMyInfo, patchMyInfoProps } from './api';
import { queryClient } from '@/shared/lib';

export const useMyQuery = () => {
  return useQuery({
    queryKey: ['my'],
    queryFn: getMyProfile,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
    throwOnError: false,
    retry: false,
  });
};

export const useMyInfoMutation = () => {
  return useMutation<void, Error, patchMyInfoProps>({
    mutationFn: (data) => patchMyInfo(data),
    onSuccess: () => {
      toast.success('변경 완료!');
      queryClient.invalidateQueries({ queryKey: ['my'] });
    },
  });
};
