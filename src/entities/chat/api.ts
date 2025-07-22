import axiosInstance from '@/shared/config/axios';
import {
  Chat,
  ChatInfo,
  ChatMessage,
  getMessageResponse,
  postMessageProps,
  postNewChatProps,
} from '.';

export const postNewChat = async (props: postNewChatProps) => {
  const { data } = await axiosInstance.post('/chatrooms', props);
  return data;
};

export const connectChat = (
  chatroomId: number,
  onMessage: (data: ChatMessage) => void,
  onRead: () => void,
  onError: (error: Event) => void,
) => {
  const es = new EventSource(
    `${process.env.NEXT_PUBLIC_API_URL}chatrooms/${chatroomId}/subscribe`,
    { withCredentials: true },
  );

  es.addEventListener('CHAT_MESSAGE', (e: MessageEvent) => {
    try {
      const data = JSON.parse(e.data);
      onMessage(data);
    } catch (err) {
      console.error('파싱 실패', e.data);
    }
  });

  es.addEventListener('READ_ACK', (e: MessageEvent) => {
    try {
      onRead();
    } catch (err) {
      console.error('SSE 실패', e.data);
    }
  });

  es.onerror = (e) => {
    onError(e);
    es.close();
  };
  return es;
};

export const getChatInfo = async (chatroomId: number): Promise<ChatInfo> => {
  const { data } = await axiosInstance.get(`/chatrooms/${chatroomId}`);
  return data;
};

export const patchChatRoom = async (chatroomId: number) => {
  const { data } = await axiosInstance.patch(`/chatrooms/${chatroomId}`);
  return data;
};

export const postNewMessage = async ({
  chatroomId,
  message,
  fileNames,
}: postMessageProps): Promise<{ isRead: boolean }> => {
  const { data } = await axiosInstance.post(
    `/chatrooms/${chatroomId}/messages`,
    { message, fileNames },
  );
  return data;
};

export const getMessages = async (
  chatroomId: number,
): Promise<getMessageResponse> => {
  const { data } = await axiosInstance.get(`/chatrooms/${chatroomId}/messages`);
  return data;
};

export const getChats = async (): Promise<Chat[]> => {
  const { data } = await axiosInstance.get('/chatrooms');
  return data;
};

export const getUnreadMessage = async () => {
  const { data } = await axiosInstance.get('/chatrooms/messages/unread');
  return data;
};
