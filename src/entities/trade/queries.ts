import { toast } from 'react-toastify';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getPostTrades,
  patchTrade,
  postTrade,
  PostTradeReq,
  ChangeTradeStatusReq,
  getTrades,
  getTradeDetail,
  deleteTrade,
  GetTradesReq,
} from '.';
import { queryClient } from '@/shared/lib';

export const usePostTradeQuery = (postId: number) => {
  return useQuery({
    queryKey: ['trade', postId],
    queryFn: () => getPostTrades(postId),
  });
};

export const useTradeMutation = (postId: number) => {
  return useMutation<void, Error, ChangeTradeStatusReq>({
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
  return useMutation<void, Error, PostTradeReq>({
    mutationFn: (data) => postTrade(data),
    onSuccess: () => {
      const myData = queryClient.getQueryData<{ memberId: string }>(['my']);
      const myId = myData?.memberId;
      toast.success('거래 요청이 완료되었습니다');
      if (myId) {
        queryClient.invalidateQueries({ queryKey: ['bookcase', myId] });
      } else {
        queryClient.invalidateQueries({ queryKey: ['bookcase'] });
      }
    },
  });
};

export const useTradeQuery = ({ key, status }: GetTradesReq) => {
  return useQuery({
    queryKey: ['tradelist', key],
    queryFn: () => getTrades({ key, status }),
  });
};

export const useTradeDetailQuery = (tradeId: number) => {
  return useQuery({
    queryKey: ['tradeDetail', tradeId],
    queryFn: () => getTradeDetail(tradeId),
  });
};

export const useDeleteTradeMutation = () => {
  return useMutation({
    mutationFn: (tradeId: number) => deleteTrade(tradeId),
    onSuccess: () => {
      toast.success('거래가 삭제되었습니다.');
    },
  });
};
