import { create } from 'zustand';
import { BookModel } from '@/entities/listing';

type WriteState = {
  categoryId: number | null;
  book: BookModel | null;
  setCategoryId: (id: number | null) => void;
  setBook: (b: BookModel | null) => void;
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
