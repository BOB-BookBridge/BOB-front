'use client';

import { useRouter } from 'next/navigation';
import { useFABStore, useWidgetStore } from '@/shared/model';
import { useChatQuery } from '@/entities/chat';
import { LoadingIndicator } from '@/shared/ui';
import ChatListItem from './ChatListItem';

const ChatList = () => {
  const router = useRouter();
  const activeWidget = useWidgetStore((s) => s.activeWidget);
  const setShow = useFABStore((s) => s.setShow);
  const setChatId = useFABStore((s) => s.setChatId);
  const { data, isPending } = useChatQuery();

  function handleClickChat(id: number | null) {
    if (activeWidget === 'chat') {
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
