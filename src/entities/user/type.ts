import { BookStatus } from '../listing';

export interface UserProfileProps {
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
