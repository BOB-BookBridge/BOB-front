'use client';

import { useCallback } from 'react';

export function useTradeActions(tradeId: number) {
  const handleAccept = useCallback(() => {
    console.log('accept', tradeId);
  }, [tradeId]);

  const handleReject = useCallback(() => {
    console.log('reject', tradeId);
  }, [tradeId]);

  const handleDelete = useCallback(() => {
    console.log('delete', tradeId);
  }, [tradeId]);

  const handleEdit = useCallback(() => {
    console.log('edit', tradeId);
  }, [tradeId]);

  return {
    handleAccept,
    handleReject,
    handleDelete,
    handleEdit,
  };
}
