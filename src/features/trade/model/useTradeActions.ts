'use client';

import { useCallback } from 'react';
import {
  GetTradesReq,
  useDeleteTradeMutation,
  useTradeMutation,
} from '@/entities/trade';
import { useHandleOpenWidget } from '@/shared/model';

interface useTradeActionsParams extends GetTradesReq {
  tradeId: number;
}
export function useTradeActions({
  tradeId,
  key,
  status,
}: useTradeActionsParams) {
  const { mutate } = useTradeMutation({ postId: undefined, key, status });
  const { mutate: deleteTrade } = useDeleteTradeMutation();
  const handleOpenWidget = useHandleOpenWidget();

  const handleAccept = useCallback(() => {
    mutate(
      { tradeId, status: 'ACCEPTED', reason: null },
      {
        onSuccess: (res) => {
          if (res.chatroomId) {
            handleOpenWidget({ chatId: res.chatroomId, type: 'chat' });
          }
        },
      },
    );
  }, [tradeId]);

  const handleReject = useCallback(() => {
    mutate({ tradeId, status: 'REJECTED', reason: null });
  }, [tradeId]);

  const handleCancel = useCallback(() => {
    mutate({ tradeId, status: 'CANCELED', reason: null });
  }, [tradeId]);

  const handleDelete = useCallback(() => {
    deleteTrade(tradeId);
  }, [tradeId]);

  return {
    handleAccept,
    handleReject,
    handleCancel,
    handleDelete,
  };
}
