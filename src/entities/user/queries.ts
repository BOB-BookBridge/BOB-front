import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getMyProfile,
  getUserProfile,
  patchNickname,
  patchPassword,
  patchPasswordProps,
  patchTempPassword,
} from '.';
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
  return useMutation<void, Error, string>({
    mutationFn: (data) => patchNickname(data),
    onSuccess: () => {
      toast.success('닉네임 변경 완료');
      queryClient.invalidateQueries({ queryKey: ['my'] });
    },
  });
};

export const usePasswordMutation = () => {
  return useMutation<void, Error, patchPasswordProps>({
    mutationFn: (data) => patchPassword(data),
    onSuccess: () => {
      toast.success('비밀번호 변경 완료');
    },
  });
};

export const useTempPasswordMutation = () => {
  return useMutation<void, Error, string>({
    mutationFn: (data) => patchTempPassword(data),
    onSuccess: () => {
      toast.success('임시 비밀번호를 발급했습니다. 메일함을 확인해 주세요');
    },
  });
};

export const useUserQuery = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: ({ queryKey }) => getUserProfile(queryKey[1]),
  });
};
