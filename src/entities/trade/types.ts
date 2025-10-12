export type TradeStatus = 'REQUESTED' | 'RESERVED' | 'COMPLETED' | 'CANCELED';

export interface GetTradeRes {
  trades: TradeRes[];
}

export interface TradeRes {
  id: 9;
  status: TradeStatus;
  buyer: {
    id: string;
    nickname: string;
    profile: string | null;
  };
}

export interface TradeProps {
  tradeId: number;
  status: TradeStatus;
  reason: string | null;
}
