import axiosInstance from '@/shared/config/axios';
import { GetTradeRes, TradeStatus } from '.';

export const getTrades = async (postId: number): Promise<GetTradeRes> => {
  const { data } = await axiosInstance.get(`/posts/${postId}/trades`);
  return data;
};

export const patchTrade = async ({
  tradeId,
  status,
  reason,
}: {
  tradeId: number;
  status: TradeStatus;
  reason: string | null;
}) => {
  const { data } = await axiosInstance.patch(`/trades/${tradeId}`, {
    status,
    reason,
  });
  return data;
};
