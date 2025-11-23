import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib';
import { BookState } from '../listing';
import {
  PostBookcaseReq,
  getBookcase,
  GetBookcaseReq,
  getMyProfile,
  getUserProfile,
  patchMyInfo,
  patchPassword,
  patchPasswordReq,
  patchTempPassword,
  postBookcaseItem,
  getWishes,
  deleteBookcaseItem,
  postWishItem,
  deleteWishItem,
  deleteUser,
  patchMyInfoReq,
} from '.';

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
  return useMutation<void, Error, patchMyInfoReq>({
    mutationFn: (data) => patchMyInfo(data),
    onSuccess: () => {
      toast.success('내 정보 수정 완료');
      queryClient.invalidateQueries({ queryKey: ['my'] });
    },
  });
};

export const usePasswordMutation = () => {
  return useMutation<void, Error, patchPasswordReq>({
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

export const useDeleteUserMutation = () => {
  return useMutation({
    mutationFn: () => deleteUser(),
  });
};

export const useUserQuery = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: ({ queryKey }) => getUserProfile(queryKey[1]),
  });
};

export const useBookcaseMutation = () => {
  return useMutation<void, Error, PostBookcaseReq>({
    mutationFn: (data) => postBookcaseItem(data),
    onSuccess: () => {
      const myData = queryClient.getQueryData<{ memberId: string }>(['my']);
      const myId = myData?.memberId;
      toast.success('책 등록 완료');
      if (myId) {
        queryClient.invalidateQueries({ queryKey: ['my'] });
        queryClient.invalidateQueries({ queryKey: ['bookcase', myId] });
      } else {
        queryClient.invalidateQueries({ queryKey: ['bookcase'] });
      }
    },
  });
};

export const useBookcaseQuery = (
  prop: GetBookcaseReq,
  options?: { enabled?: boolean },
) => {
  return useQuery({
    queryKey: ['bookcase', prop.memberId],
    queryFn: () => getBookcase(prop),
    enabled: options?.enabled ?? !!prop.memberId,
  });
};

export const useDeleteBookcaseItemMutation = () => {
  return useMutation({
    mutationFn: (id: number) => deleteBookcaseItem(id),
    onSuccess: () => {
      toast.success('삭제 완료');
      queryClient.invalidateQueries({ queryKey: ['my'] });
    },
  });
};

export const useWishesQuery = (memberId: string) => {
  return useQuery({
    queryKey: ['wishes', memberId],
    queryFn: () => getWishes(memberId),
  });
};

export const usePostWishItemMutation = () => {
  return useMutation({
    mutationFn: (req: BookState) => postWishItem(req),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['my'] });
    },
  });
};

export const useDeleteWishesItemMutation = () => {
  return useMutation({
    mutationFn: (id: number) => deleteWishItem(id),
    onSuccess: () => {
      toast.success('삭제 완료');
      queryClient.invalidateQueries({ queryKey: ['my'] });
    },
  });
};
