export type BookStatus = 'BEST' | 'HIGH' | 'MEDIUM' | 'LOW';
export type TradeStatus = 'READY' | 'IN_PROGRESS' | 'COMPLETED';

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
