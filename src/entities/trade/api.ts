import axiosInstance from '@/shared/config/axios';
import {
  GetPostTradeRes,
  GetTradeDetailRes,
  GetTradeListRes,
  GetTradesReq,
  PostTradeReq,
  TradeStatus,
} from '.';

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

export const getTrades = async (
  params?: GetTradesReq,
): Promise<GetTradeListRes> => {
  const { key, status } = params || {};
  const { data } = await axiosInstance.get('/trades', {
    params: {
      key: key ? key : undefined,
      status: status ? status : undefined,
    },
  });
  return data;
};

export const getTradeDetail = async (
  tradeId: number,
): Promise<GetTradeDetailRes> => {
  const { data } = await axiosInstance.get(`/trades/${tradeId}`);
  return data;
};

export const deleteTrade = async (tradeId: number) => {
  const { data } = await axiosInstance.delete(`/trades/${tradeId}`);
  return data;
};
