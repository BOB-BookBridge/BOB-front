'use client';

import { create } from 'zustand';

interface ChatWidgetState {
  isOpen: boolean;
  setIsOpen: (b: boolean) => void;
  show: 'LIST' | 'ROOM';
  setShow: (s: 'LIST' | 'ROOM') => void;
  chatId: number | null;
  setChatId: (d: number | null) => void;
}

export const useChatWidgetStore = create<ChatWidgetState>((set) => ({
  isOpen: false,
  setIsOpen: (b) => {
    set({ isOpen: b });
  },
  show: 'LIST',
  setShow: (s) => {
    set({ show: s });
  },
  chatId: null,
  setChatId: (d) => {
    set({ chatId: d });
  },
}));
