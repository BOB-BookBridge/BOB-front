import { DetailImage, PostStatus } from '../listing';

interface PartnerProps {
  partnerId: number;
  nickname: string;
  profileUrl: string | null;
}

export interface ChatListProps {
  chatroomId: number;
  title: string;
  thumbnailUrl: string;
  lastMessage: string;
  lastMessageAt: string;
  partner: PartnerProps;
  unreadCount: number;
}

export type ChatType = 'TEXT' | 'IMAGE' | 'SYSTEM';

export interface postNewChatResponse {
  chatRoomId: number;
}

export interface postNewChatProps {
  postId: number;
  isFar: boolean;
}

export interface ChatPost {
  id: number;
  status: PostStatus;
  sellerId: string;
  title: string;
  thumbnailUrl: string;
  sellPrice: number;
}
export interface ChatPartner {
  id: string;
  nickname: string;
  profileUrl: string | null;
}
export interface ChatInfo {
  chatroomId: number;
  title: string;
  trade: {
    id: number;
    status: 'REQUESTED' | 'CANCELED' | 'COMPLETED';
  };
  post: ChatPost;
  partner: ChatPartner;
}

export interface postMessageProps {
  chatroomId: number;
  message: string | null;
  fileNames: string[];
}

export interface getMessageResponse {
  messages: ChatMessage[];
  hasNext: boolean;
}

export interface ChatMessage {
  id?: number;
  type: ChatType;
  content: string | null;
  images: DetailImage[];
  sentAt?: string;
  isRead?: boolean;
  isMine?: boolean;
  isLoading?: boolean;
}

export interface Chat {
  chatroomId: number;
  thumbnailUrl: string;
  lastMessage: string;
  lastMessageAt: string;
  partner: ChatPartner;
  unreadCount: number;
}
