export type TradeStatus = 'REQUESTED' | 'RESERVED' | 'COMPLETED' | 'CANCELED';

export interface GetTradeRes {
  trades: TradeRes[];
}

export interface TradeRes {
  tradeId: 9;
  tradeStatus: TradeStatus;
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
