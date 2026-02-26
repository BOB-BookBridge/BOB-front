import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib';
import {
  getBannerNotice,
  postBannerNotice,
  patchBannerNotice,
  getAlertNotices,
  getNotice,
  postAlertNotice,
  PostBannerNoticeReq,
  PostAlertNoticeReq,
} from '.';

export const useBannerNoticeQuery = () => {
  return useQuery({
    queryKey: ['bannerNotice'],
    queryFn: getBannerNotice,
  });
};

export const usePostBannerNoticeMutation = () => {
  return useMutation({
    mutationFn: (payload: PostBannerNoticeReq) => postBannerNotice(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bannerNotice'] });
    },
  });
};

export const usePatchBannerNoticeMutation = () => {
  return useMutation({
    mutationFn: patchBannerNotice,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bannerNotice'] });
    },
  });
};

export const useAlertNoticesQuery = () => {
  return useQuery({
    queryKey: ['alertNotices'],
    queryFn: getAlertNotices,
  });
};

export const useNoticeQuery = (id: number) => {
  return useQuery({
    queryKey: ['notice', id],
    queryFn: () => getNotice(id),
  });
};

export const usePostAlertNoticeMutation = () => {
  return useMutation({
    mutationFn: (payload: PostAlertNoticeReq) => postAlertNotice(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alertNotices'] });
    },
  });
};
