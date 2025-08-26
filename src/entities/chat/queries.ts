import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib';
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

export const useExitChatMutation = () => {
  return useMutation<void, Error, number>({
    mutationFn: (data) => patchChatRoom(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
    },
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

export const useUnreadQuery = (enabled: boolean) => {
  return useQuery({
    queryKey: ['unread'],
    queryFn: () => getUnreadMessage(),
    enabled: enabled,
  });
};
