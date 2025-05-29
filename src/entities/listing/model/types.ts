export interface ListingCardProps {
  postId: number;
  categoryId: number;
  title: string;
  tradeStatus: 'READY' | 'IN_PROGRESS' | 'COMPLETED';
  sellPrice: number;
  thumbnail: string;
  bookStatus: 'BEST' | 'HIGH' | 'MEDIUM' | 'LOW';
  createdAt: string;
}
