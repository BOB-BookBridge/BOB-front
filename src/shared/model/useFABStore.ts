'use client';

import { create } from 'zustand';

interface FABState {
  isOpen: boolean;
  chatIsOpen: boolean;
  show: 'LIST' | 'ROOM';
  chatId: number | null;
  setIsOpen: (b: boolean) => void;
  toggleIsOpen: () => void;
  setChatIsOpen: (b: boolean) => void;
  setShow: (s: 'LIST' | 'ROOM') => void;
  setChatId: (d: number | null) => void;
  reset: () => void;
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
  setChatIsOpen: (b) => {
    set({ chatIsOpen: b });
  },
  show: 'LIST',
  setShow: (s) => {
    set({ show: s });
  },
  chatId: null,
  setChatId: (d) => {
    set({ chatId: d });
  },
  reset: () => {
    set({ chatIsOpen: false, show: 'LIST', chatId: null });
  },
}));
