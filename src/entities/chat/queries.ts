import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getChatInfo,
  getChats,
  getMessages,
  getUnreadMessage,
  patchChatRoom,
  postMessageProps,
  postNewChat,
  postNewChatProps,
  postNewChatResponse,
  postNewMessage,
} from '.';

export const useChatMutation = () => {
  return useMutation<postNewChatResponse, Error, postNewChatProps>({
    mutationFn: (data) => postNewChat(data),
  });
};

export const useChatInfoQuery = (
  id: number,
  options?: { enabled: boolean },
) => {
  return useQuery({
    queryKey: ['chatinfo', id],
    queryFn: ({ queryKey }) => getChatInfo(queryKey[1] as number),
    enabled: options?.enabled,
  });
};

// #todo: 채팅 목록 refetch
export const useExitChatMutation = () => {
  return useMutation<void, Error, number>({
    mutationFn: (data) => patchChatRoom(data),
  });
};

interface useMessageMutationResponse {
  isRead: boolean;
}

export const useMessageMutate = () => {
  return useMutation<useMessageMutationResponse, Error, postMessageProps>({
    mutationFn: (data) => postNewMessage(data),
  });
};

export const useMessageQuery = (id: number, options?: { enabled: boolean }) => {
  return useQuery({
    queryKey: ['message', id],
    queryFn: ({ queryKey }) => getMessages(queryKey[1] as number),
    enabled: options?.enabled,
  });
};

export const useChatQuery = () => {
  return useQuery({
    queryKey: ['chats'],
    queryFn: () => getChats(),
  });
};

// #todo: 채팅방 입장, 알림 오면 갱신
export const useUnreadQuery = (enabled: boolean) => {
  return useQuery({
    queryKey: ['unread'],
    queryFn: () => getUnreadMessage(),
    enabled: enabled,
  });
};
