import { data } from '@/mocks/mockChatList';
import ChatListItem from './ChatListItem';

const ChatList = () => {
  return (
    <div>
      {data.map((chat, idx) => (
        <ChatListItem key={chat.chatroomId} data={chat} />
      ))}
    </div>
  );
};

export default ChatList;
