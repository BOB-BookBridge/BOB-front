'use client';

import { useRouter } from 'next/navigation';
import { useFABStore } from '@/shared/model';
import { data } from '@/mocks/mockChatList';
import ChatListItem from './ChatListItem';

const ChatList = () => {
  const router = useRouter();
  const isOpen = useFABStore((s) => s.chatIsOpen);
  const setShow = useFABStore((s) => s.setShow);
  const setChatId = useFABStore((s) => s.setChatId);

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
