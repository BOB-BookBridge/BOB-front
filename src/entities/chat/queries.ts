import { useMutation, useQuery } from '@tanstack/react-query';
import {
  getChatInfo,
  patchChatRoom,
  postNewChat,
  postNewChatProps,
  postNewChatResponse,
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
    queryKey: ['chat', id],
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
