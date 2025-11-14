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
  TradeStatus,
  TradeKey,
  PatchTradeRes,
} from '.';
import { queryClient } from '@/shared/lib';

export const usePostTradeQuery = (postId: number) => {
  return useQuery({
    queryKey: ['trade', postId],
    queryFn: () => getPostTrades(postId),
  });
};

interface UseTradeMutationOptions {
  postId?: number;
  key?: TradeKey;
  status?: TradeStatus[];
}

export const useTradeMutation = ({
  postId,
  key,
  status,
}: UseTradeMutationOptions) => {
  return useMutation<PatchTradeRes, Error, ChangeTradeStatusReq>({
    mutationFn: (data) => patchTrade(data),
    onSuccess: async () => {
      if (postId) {
        await queryClient.invalidateQueries({
          queryKey: ['listingDetail', postId],
        });
        await queryClient.invalidateQueries({ queryKey: ['trade', postId] });
      }
      if (key && status)
        await queryClient.invalidateQueries({
          queryKey: ['tradelist', key, status],
        });
      toast.success('거래 상태가 변경되었습니다');
    },
  });
};

export const usePostTradeMutation = () => {
  return useMutation<void, Error, PostTradeReq>({
    mutationFn: (data) => postTrade(data),
    onSuccess: async () => {
      const myData = queryClient.getQueryData<{ memberId: string }>(['my']);
      const myId = myData?.memberId;
      toast.success('거래 요청이 완료되었습니다');
      await queryClient.invalidateQueries({
        queryKey: ['tradelist', 'SENT', ['REQUESTED', 'REJECTED']],
      });
      if (myId) {
        await queryClient.invalidateQueries({ queryKey: ['bookcase', myId] });
      } else {
        await queryClient.invalidateQueries({ queryKey: ['bookcase'] });
      }
    },
  });
};

export const useTradeQuery = ({ key, status }: GetTradesReq) => {
  return useQuery({
    queryKey: ['tradelist', key, status],
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
    onSuccess: async () => {
      toast.success('거래가 삭제되었습니다.');
      await queryClient.invalidateQueries({
        queryKey: ['tradelist', 'SENT', ['REQUESTED', 'REJECTED']],
      });
    },
  });
};
