import axiosInstance from '@/shared/config/axios';
import { ChatInfo, connectChatProps, postNewChatProps } from '.';

export const postNewChat = async (props: postNewChatProps) => {
  const { data } = await axiosInstance.post('/chatrooms', props);
  return data;
};

export const connectChat = (
  chatroomId: number,
  onMessage: (data: connectChatProps) => void,
  onError: (error: Event) => void,
) => {
  const es = new EventSource(
    `${process.env.NEXT_PUBLIC_API_URL}/chatrooms/${chatroomId}/subscribe`,
    { withCredentials: true },
  );

  es.onmessage = (e) => {
    const data = JSON.parse(e.data);
    onMessage(data);
  };

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
