import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getTrades,
  patchTrade,
  postTrade,
  PostTradeProps,
  TradeProps,
} from '.';
import { queryClient } from '@/shared/lib';

export const useTradeQuery = (postId: number) => {
  return useQuery({
    queryKey: ['trade', postId],
    queryFn: () => getTrades(postId),
  });
};

export const useTradeMutation = (postId: number) => {
  return useMutation<void, Error, TradeProps>({
    mutationFn: (data) => patchTrade(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['listingDetail', postId],
      });
      await queryClient.invalidateQueries({ queryKey: ['trade', postId] });
      toast.success('거래 상태가 변경되었습니다');
    },
  });
};

export const usePostTradeMutation = () => {
  return useMutation<void, Error, PostTradeProps>({
    mutationFn: (data) => postTrade(data),
    onSuccess: () => {
      toast.success('거래 요청이 완료되었습니다');
    },
  });
};
