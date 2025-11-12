import axiosInstance from '@/shared/config/axios';
import { GetPostTradeRes, PostTradeReq, TradeStatus } from '.';

export const getPostTrades = async (
  postId: number,
): Promise<GetPostTradeRes> => {
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

export const postTrade = async (prop: PostTradeReq) => {
  const { data } = await axiosInstance.post('trades', prop);
  return data;
};
