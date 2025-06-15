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
