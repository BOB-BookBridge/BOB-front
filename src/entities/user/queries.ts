import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getMyProfile, patchNickname } from './api';
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

export const useNicknameMutation = () => {
  return useMutation<void, Error, string>({
    mutationFn: (data) => patchNickname(data),
    onSuccess: () => {
      toast.success('닉네임 변경 완료!');
      queryClient.invalidateQueries({ queryKey: ['my'] });
    },
  });
};
