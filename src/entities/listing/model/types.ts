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

export interface ListingDetailProps {
  postId: number;
  sellPrice: number;
  bookStatus: BookStatus;
  tradeStatus: TradeStatus;
  category: number;
  book: {
    title: string;
    author: string;
    description: string;
    priceStandard: number;
    pubDate: string;
  };
  description: string;
  images: string[];
  writer: {
    memberId: string;
    nickname: string;
    activityArea: string;
    profileUrl: string;
  };
  scrapCount: number;
  viewCount: number;
  isFavorite: boolean;
  isOwner: boolean;
  createdAt: string;
}
