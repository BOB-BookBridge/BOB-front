import { create } from 'zustand';

interface MyState {
  isLogin: boolean;
  setIsLogin: (b: boolean) => void;
}
export const useMyStore = create<MyState>((set) => ({
  isLogin: false,
  setIsLogin: (b) => set({ isLogin: b }),
}));
