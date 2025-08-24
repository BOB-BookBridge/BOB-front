import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Mode = 'light' | 'dark';
interface ThemeState {
  mode: Mode;
  toggleMode: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: 'light',
      toggleMode: () =>
        set({ mode: get().mode === 'light' ? 'dark' : 'light' }),
    }),
    {
      name: 'theme',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
