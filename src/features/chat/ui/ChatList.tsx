'use client';

import { useRouter } from 'next/navigation';
import { useChatQuery } from '@/entities/chat';
import { LoadingIndicator } from '@/shared/ui';
import { useFABStore } from '@/shared/model';
import ChatListItem from './ChatListItem';

const ChatList = () => {
  const router = useRouter();
  const isOpen = useFABStore((s) => s.chatIsOpen);
  const setShow = useFABStore((s) => s.setShow);
  const setChatId = useFABStore((s) => s.setChatId);
  const { data, isPending } = useChatQuery();

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
      {data && !isPending ? (
        data.map((chat, idx) => (
          <ChatListItem
            key={chat.chatroomId}
            data={chat}
            onClick={handleClickChat}
          />
        ))
      ) : (
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 20,
          }}>
          <LoadingIndicator text='로딩중' />
        </div>
      )}
    </div>
  );
};

export default ChatList;
