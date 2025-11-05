import { Book } from '../user';

export type BookStatus = 'BEST' | 'HIGH' | 'MEDIUM' | 'LOW';
export type PostStatus = 'READY' | 'IN_PROGRESS' | 'COMPLETED';
export type SortKey = 'RECENT' | 'OLD' | 'LOW_PRICE' | 'HIGH_PRICE';
export type SearchKey = '통합' | '제목' | '저자';

export type GetPostsResponse = {
  totalCount: number;
  posts: ListingCardProps[];
};

export type DetailImage = {
  fileName: string;
};

export type BookState = {
  isbn: string;
  title: string;
  author: string;
  description: string;
  priceStandard: number;
  cover: string;
  pubDate: string;
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
  sellerId: string;
  thumbnailUrl: string;
  sellPrice: number;
  bookStatus: BookStatus;
  postStatus: PostStatus;
  category: number;
  sellerBookId: number;
  book: {
    title: string;
    author: string;
    description: string;
    priceStandard: number;
    pubDate: string;
  };
  description: string;
  images: DetailImage[];
  writer: {
    memberId: string;
    nickname: string;
    emdId: number;
    profileUrl: string | null;
    interests: string[];
    wishes: Book[];
  };
  scrapCount: number;
  viewCount: number;
  isFavorite: boolean;
  isOwner: boolean;
  wishOnly: boolean;
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

export interface postListingProps {
  categoryId: number;
  sellPrice: number;
  bookStatus: BookStatus;
  postDescription: string;
  book: BookState;
  fileNames: string[];
  wishOnly: boolean;
}

export interface patchListingProps {
  sellPrice?: number;
  bookStatus?: BookStatus;
  description?: string;
  fileNames?: string[];
}
