'use client';

import { useRouter } from 'next/navigation';
import { useChatWidgetStore } from '@/shared/model';
import { data } from '@/mocks/mockChatList';
import ChatListItem from './ChatListItem';

const ChatList = () => {
  const router = useRouter();
  const isOpen = useChatWidgetStore((s) => s.isOpen);
  const setShow = useChatWidgetStore((s) => s.setShow);
  const setChatId = useChatWidgetStore((s) => s.setChatId);

  function handleClickChat(id: number | null) {
    if (isOpen) {
      setShow('ROOM');
      setChatId(id);
    } else {
      if (id !== null) router.push(`/chats/${id}`);
    }
  }
  return (
    <div>
      {data.map((chat, idx) => (
        <ChatListItem
          key={chat.chatroomId}
          data={chat}
          onClick={handleClickChat}
        />
      ))}
    </div>
  );
};

export default ChatList;
