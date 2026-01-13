import { BookModel, BookStatus } from '../listing';

export interface UserAreaModel {
  emdId: number;
  isAuthentication: boolean;
  authenticatedAt: string;
}

export interface UserProfileRes {
  isSocial: boolean;
  email: string;
  interests: string[];
  id: string;
  nickname: string;
  role: 'ADMIN' | 'USER';
  profileImageUrl: string | null;
  area: UserAreaModel;
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
  isbn: string;
}

export interface PostBookcaseReq extends BookModel {
  status: BookStatus;
}

export interface GetBookcaseReq {
  memberId: string;
  key?: 'AVAILABLE' | 'UNAVAILABLE';
  require?: number[];
}
