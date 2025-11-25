import { BookState, BookStatus } from '../listing';

export interface UserProfileRes {
  isSocial: boolean;
  email: string;
  interests: string[];
  memberId: string;
  nickname: string;
  profileImageUrl: string | null;
  area: {
    emdId: number;
    isAuthentication: boolean;
    authenticatedAt: string;
  };
  bookcase: Bookcase[];
  wishes: Book[];
}

export interface patchMyInfoReq {
  nickname: string;
  emdId: number;
  areaAuthenticate: boolean;
  lat?: number;
  lon?: number;
  interests: string[];
}

export interface patchPasswordReq {
  oldPassword: string;
  newPassword: string;
}

export interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
}

export interface Bookcase extends Book {
  status: BookStatus;
  available: boolean;
}

export interface PostBookcaseReq extends BookState {
  status: BookStatus;
}

export interface GetBookcaseReq {
  memberId: string;
  key?: 'AVAILABLE' | 'UNAVAILABLE';
  require?: number[];
}
