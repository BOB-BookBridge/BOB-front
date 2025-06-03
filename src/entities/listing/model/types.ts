export type BookStatus = 'BEST' | 'HIGH' | 'MEDIUM' | 'LOW';
export type TradeStatus = 'READY' | 'IN_PROGRESS' | 'COMPLETED';
export type SortKey = 'RECENT' | 'OLD' | 'LOW_PRICE' | 'HIGH_PRICE';

export interface ListingCardProps {
  postId: number;
  categoryId: number;
  title: string;
  tradeStatus: TradeStatus;
  sellPrice: number;
  thumbnail: string;
  bookStatus: BookStatus;
  createdAt: string;
}
