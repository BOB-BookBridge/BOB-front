import { PostStatus } from '../listing';

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

export interface connectChatProps {
  event: string;
  data: {
    id: number;
    type: 'TEXT' | 'IMAGE' | 'SYSTEM';
    content: string;
    images: string[];
    sentAt: string;
  };
}
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
