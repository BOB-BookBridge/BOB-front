import { DetailImage, PostTradeStatus } from '../listing';
import { UserProfileRes } from '../user';
import { TradeStatus } from '../trade';

export type ChatType = 'TEXT' | 'IMAGE' | 'SYSTEM';

export interface ChatPost {
  id: number;
  status: PostTradeStatus;
  sellerId: string;
  title: string;
  thumbnailUrl: string;
  sellPrice: number;
}

export type ChatUser = Pick<
  UserProfileRes,
  'id' | 'nickname' | 'profileImageUrl'
>;

export interface ChatInfo {
  id: number;
  title: string;
  trade: {
    id: number;
    status: TradeStatus;
  };
  post: ChatPost;
  partner: ChatUser;
}

export interface postMessageReq {
  chatroomId: number;
  message: string | null;
  fileNames: string[];
}

interface BasicChat {
  type: ChatType;
  content: string | null;
  images: DetailImage[];
  sentAt: string;
  isMine: boolean;
}
export interface ServerChat extends BasicChat {
  id: number;
  isRead: boolean;
}
export interface LocalChat extends BasicChat {
  clientId: string;
  isLoading: boolean;
  isError: boolean;
}

export type ChatMessage = ServerChat | LocalChat;

export interface Chat {
  id: number;
  thumbnailUrl: string;
  lastMessage: string;
  lastMessageAt: string;
  partner: ChatUser;
  unreadCount: number;
}
