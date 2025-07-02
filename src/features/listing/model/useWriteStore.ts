import { create } from 'zustand';

type BookState = {
  isbn: string;
  title: string;
  author: string;
  description: string;
  priceStandard: number;
  cover: string;
  pubDate: string;
};
type WriteState = {
  book: BookState | null;
  setBook: (b: BookState | null) => void;
};

export const useWriteStore = create<WriteState>((set) => ({
  book: null,
  setBook: (b) => set({ book: b }),
  resetWrite: () => {
    set({ book: null });
  },
}));
