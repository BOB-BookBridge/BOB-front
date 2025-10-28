'use client';

import { create } from 'zustand';

interface FABState {
  isOpen: boolean;
  show: 'LIST' | 'ROOM';
  chatId: number | null;
  setIsOpen: (b: boolean) => void;
  toggleIsOpen: () => void;
  setShow: (s: 'LIST' | 'ROOM') => void;
  setChatId: (d: number | null) => void;
  resetChat: () => void;
  resetAll: () => void;
}

export const useFABStore = create<FABState>((set) => ({
  isOpen: false,
  setIsOpen: (b) => {
    set({ isOpen: b });
  },
  toggleIsOpen: () => {
    set((s) => ({ isOpen: !s.isOpen }));
  },
  chatIsOpen: false,
  show: 'LIST',
  setShow: (s) => {
    set({ show: s });
  },
  chatId: null,
  setChatId: (d) => {
    set({ chatId: d });
  },
  resetChat: () => {
    set({ show: 'LIST', chatId: null });
  },
  resetAll: () => {
    set({ isOpen: false, show: 'LIST', chatId: null });
  },
}));
