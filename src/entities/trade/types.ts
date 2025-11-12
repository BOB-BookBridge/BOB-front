export type TradeStatus =
  | 'REQUESTED'
  | 'RESERVED'
  | 'COMPLETED'
  | 'CANCELED'
  | 'REJECTED'
  | 'REQUESTED';

export interface GetPostTradeRes {
  trades: PostTradeRes[];
}

export interface PostTradeRes {
  id: 9;
  status: TradeStatus;
  buyer: {
    id: string;
    nickname: string;
    profile: string | null;
  };
}

export interface ChangeTradeStatusReq {
  tradeId: number;
  status: TradeStatus;
  reason: string | null;
}

export interface PostTradeReq {
  postId: number;
  itemIds: number[];
  isFar: boolean;
}

export interface GetTradeListRes {
  totalCount: number;
  trades: TradeListItem[];
}

export interface TradeListItem {
  id: number;
  status: TradeStatus;
  seller: TradeParticipant;
  buyer: TradeParticipant;
}

interface TradeParticipant {
  id: string;
  nickname: string;
  item: TradeMainItem;
}

export interface TradeMainItem {
  title: string;
  cover: string;
  size: number;
}
