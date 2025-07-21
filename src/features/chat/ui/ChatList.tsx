'use client';

import { useRouter } from 'next/navigation';
import { useFABStore } from '@/shared/model';
import ChatListItem from './ChatListItem';
import { useChatQuery } from '@/entities/chat';

const ChatList = () => {
  const router = useRouter();
  const isOpen = useFABStore((s) => s.chatIsOpen);
  const setShow = useFABStore((s) => s.setShow);
  const setChatId = useFABStore((s) => s.setChatId);
  const { data } = useChatQuery();

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
      {data &&
        data.map((chat, idx) => (
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
