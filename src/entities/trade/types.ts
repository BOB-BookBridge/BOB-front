import { Bookcase } from '../user';

export type TradeStatus =
  | 'REQUESTED'
  | 'RESERVED'
  | 'COMPLETED'
  | 'CANCELED'
  | 'REJECTED'
  | 'ACCEPTED';

export interface GetPostTradeRes {
  trades: PostTradeRes[];
}

export interface PatchTradeRes {
  chatroomId?: number;
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

interface PostSum {
  id: number;
  title: string;
  cover: string;
}

interface TradeBook extends Bookcase {
  priceStandard: number;
  pubDate: string;
}

interface TradeUser {
  id: string;
  nickname: string;
  worth: number;
  item: TradeBook[];
}
export interface GetTradeDetailRes {
  id: number;
  status: TradeStatus;
  post: PostSum;
  seller: TradeUser;
  buyer: TradeUser;
}

export type TradeKey = 'SENT' | 'RECEIVED';

export interface GetTradesReq {
  key: TradeKey;
  status: TradeStatus[];
}
