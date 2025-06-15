'use client';

import { create } from 'zustand';

interface ChatWidgetState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

export const useChatWidgetStore = create<ChatWidgetState>((set) => ({
  isOpen: false,
  open: () => {
    console.log('store open() 실행');
    set({ isOpen: true });
  },
  close: () => set({ isOpen: false }),
  toggle: () =>
    set((state) => {
      console.log('현재 isOpen 값:', state.isOpen);
      return { isOpen: !state.isOpen };
    }),
}));
