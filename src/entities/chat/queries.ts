import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/shared/lib';
import {
  getChatInfo,
  getChats,
  getMessages,
  getUnreadMessage,
  patchChatRoom,
  postMessageReq,
  postNewMessage,
} from '.';

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

interface useMessageMutationRes {
  isRead: boolean;
  id: number;
  sentAt: string;
}

export const useMessageMutate = () => {
  return useMutation<useMessageMutationRes, Error, postMessageReq>({
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
