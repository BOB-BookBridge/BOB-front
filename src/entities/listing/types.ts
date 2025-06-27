export type BookStatus = 'BEST' | 'HIGH' | 'MEDIUM' | 'LOW';
export type PostStatus = 'READY' | 'IN_PROGRESS' | 'COMPLETED';
export type SortKey = 'RECENT' | 'OLD' | 'LOW_PRICE' | 'HIGH_PRICE';
export type SearchKey = '통합' | '제목' | '저자';

export type GetPostsResponse = {
  totalCount: number;
  posts: ListingCardProps[];
};
export interface ListingCardProps {
  postId: number;
  categoryId: number;
  postTitle: string;
  postStatus: PostStatus;
  sellPrice: number;
  thumbnailUrl: string;
  bookStatus: BookStatus;
  createdAt: string;
}

export interface ListingDetailProps {
  postId: number;
  sellPrice: number;
  bookStatus: BookStatus;
  postStatus: PostStatus;
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
    profileUrl: string | null;
  };
  scrapCount: number;
  viewCount: number;
  isFavorite: boolean;
  isOwner: boolean;
  createdAt: string;
}

export interface TradeProps {
  tradeId: number;
  buyer: {
    nickname: string;
    profileUrl: string | null;
  };
}

export interface getPostsProps {
  key?: SearchKey;
  keyword?: string;
  memberId?: string;
  emdId?: number;
  categoryId?: number;
  price?: number;
  postStatus?: PostStatus;
  bookStatus?: BookStatus;
  sort?: SortKey;
  page?: number;
  size?: number;
}
