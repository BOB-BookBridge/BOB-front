import { TradeStatus } from '../trade';
import { UserProfileRes } from '../user';

export type BookStatus = 'BEST' | 'HIGH' | 'MEDIUM' | 'LOW';
export type PostTradeStatus = 'READY' | 'RESERVED' | 'COMPLETED';
export type SortKey = 'RECENT' | 'OLD' | 'LOW_PRICE' | 'HIGH_PRICE';
export type SearchKey = '통합' | '제목' | '저자';
export type ParticipationType = TradeStatus | 'NONE' | 'OWNER';

export interface GetPostsRes {
  totalCount: number;
  posts: PostModel[];
}

export interface DetailImage {
  fileName: string;
}

export interface BookModel {
  isbn: string;
  title: string;
  author: string;
  description: string;
  priceStandard: number;
  cover: string;
  pubDate: string;
}

export interface PostModel {
  id: number;
  categoryId: number;
  title: string;
  status: PostTradeStatus;
  price: number;
  thumbnailUrl: string;
  bookStatus: BookStatus;
  createdAt: string;
  participation: ParticipationType;
}

export interface ListingDetailTrade {
  id: number;
  status: TradeStatus;
}

export type ListingBook = Omit<BookModel, 'priceStandard' | 'cover'>;
export type ListingWriterModel = Pick<
  UserProfileRes,
  'id' | 'nickname' | 'profileImageUrl' | 'interests' | 'wishes'
> & { emdId: number };

export interface ListingDetailRes {
  id: number;
  thumbnailUrl: string;
  price: number;
  bookStatus: BookStatus;
  tradeStatus: PostTradeStatus;
  categoryId: number;
  book: ListingBook;
  description: string;
  images: DetailImage[];
  writer: ListingWriterModel;
  scrapCount: number;
  viewCount: number;
  isFavorite: boolean;
  isOwner: boolean;
  wishOnly: boolean;
  createdAt: string;
  trade: ListingDetailTrade | null;
}

export interface getPostsReq {
  key?: SearchKey;
  keyword?: string;
  memberId?: string;
  emdId?: number;
  categoryId?: number;
  price?: number;
  postStatus?: PostTradeStatus;
  bookStatus?: BookStatus;
  sort?: SortKey;
  page?: number;
  size?: number;
}

export interface postListingReq {
  categoryId: number;
  bookStatus: BookStatus;
  description: string;
  book: BookModel;
  fileNames: string[];
  wishOnly: boolean;
}

export interface patchListingReq {
  bookStatus?: BookStatus;
  description?: string;
  fileNames?: string[];
}
