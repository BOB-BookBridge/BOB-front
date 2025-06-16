import { ChatListProps } from '@/entities/chat/types';

export const data: ChatListProps[] = [
  {
    chatroomId: 1,
    thumbnailUrl:
      'https://image.aladin.co.kr/product/20723/23/cover500/8936477595_1.jpg',
    title: '디디의 우산',
    lastMessage: '책 아직 남아 있나요?ㅜ어ㅏㅁ루어ㅏㅁ루어나ㅜ라무ㅏㅇ누',
    lastMessageAt: '2024-03-30T15:00:00',
    partner: {
      partnerId: 58,
      nickname: '가나다라마바사아자차카타',
      profileUrl: null,
    },
    unreadCount: 3,
  },
  {
    chatroomId: 2,
    title: '이펙티브 자바',
    thumbnailUrl:
      'https://image.aladin.co.kr/product/7924/83/cover500/k542434036_1.jpg',
    lastMessage: '넵! 택배로도 가능해요',
    lastMessageAt: '2024-03-30T16:55:20',
    partner: {
      partnerId: 61,
      nickname: 'javaboy',
      profileUrl: null,
    },
    unreadCount: 0,
  },
];
