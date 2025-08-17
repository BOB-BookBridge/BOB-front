import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getTrades, patchTrade, TradeProps } from '.';
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
      toast.success('거래 상태가 변경되었습니다.');
    },
  });
};
