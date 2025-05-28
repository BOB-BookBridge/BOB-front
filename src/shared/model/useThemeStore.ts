import { create } from 'zustand';

type ThemeMode = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
  toggleMode: () => void;
}

const useThemeStore = create<ThemeState>((set) => ({
  mode: 'light',
  toggleMode: () =>
    set((state) => ({
      mode: state.mode === 'light' ? 'dark' : 'light',
    })),
}));

export default useThemeStore;
