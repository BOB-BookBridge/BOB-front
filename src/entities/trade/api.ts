import axiosInstance from '@/shared/config/axios';
import { GetTradeRes, TradeStatus } from '.';

export const getTrades = async (postId: number): Promise<GetTradeRes> => {
  const { data } = await axiosInstance.get('/trades', { params: { postId } });
  return data;
};

export const patchTrade = async ({
  tradeId,
  status,
}: {
  tradeId: number;
  status: TradeStatus;
}) => {
  const { data } = await axiosInstance.patch(`/trades/${tradeId}`, { status });
  return data;
};
