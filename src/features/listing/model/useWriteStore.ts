import { BookState } from '@/entities/listing';
import { create } from 'zustand';

type WriteState = {
  categoryId: number | null;
  book: BookState | null;
  setCategoryId: (id: number | null) => void;
  setBook: (b: BookState | null) => void;
  resetWrite: () => void;
};

export const useWriteStore = create<WriteState>((set) => ({
  categoryId: null,
  book: null,
  setBook: (b) => set({ book: b }),
  setCategoryId: (id) => set({ categoryId: id }),
  resetWrite: () => {
    set({
      book: null,
      categoryId: null,
    });
  },
}));
