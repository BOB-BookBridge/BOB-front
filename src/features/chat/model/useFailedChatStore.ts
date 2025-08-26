import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatMessage } from '@/entities/chat';

interface FailedChatStore {
  failedChats: Record<number, ChatMessage[]>;
  addFailedChat: (chatroomId: number, message: ChatMessage) => void;
  deleteFailedChat: (chatroomId: number, clientId: string) => void;
  reset: () => void;
}

export const useFailedChatStore = create<FailedChatStore>()(
  persist(
    (set, get) => ({
      failedChats: {},
      addFailedChat: (chatroomId, message) => {
        const prev = get().failedChats[chatroomId] ?? [];
        set({
          failedChats: {
            ...get().failedChats,
            [chatroomId]: [...prev, message],
          },
        });
      },
      deleteFailedChat: (chatroomId, clientId) => {
        const prev = get().failedChats[chatroomId] ?? [];
        set({
          failedChats: {
            ...get().failedChats,
            [chatroomId]: prev.filter(
              (chat) => 'clientId' in chat && chat.clientId !== clientId,
            ),
          },
        });
      },
      reset: () => set({ failedChats: {} }),
    }),
    {
      name: 'failed-chat-storage',
    },
  ),
);
