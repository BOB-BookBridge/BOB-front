import { BookStatus, SortKey } from '@/entities/listing/model/types';
import { create } from 'zustand';

type FilterState = {
  emdId: number | null;
  isAvailableOnly: boolean;
  categoryId: number | null;
  bookStatus: BookStatus | null;
  priceRange: number | null;
  sort: SortKey;
  setEmdId: (e: number | null) => void;
  setIsAvailableOnly: (b: boolean) => void;
  toggleIsAvailableOnly: () => void;
  setCategoryId: (c: number | null) => void;
  setBookStatus: (b: BookStatus | null) => void;
  setPriceRange: (p: number | null) => void;
  setSort: (s: SortKey) => void;
  resetFilters: () => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  emdId: null,
  isAvailableOnly: false,
  categoryId: null,
  bookStatus: null,
  priceRange: null,
  sort: 'RECENT',
  setEmdId: (e) => set({ emdId: e }),
  setIsAvailableOnly: (b) => set({ isAvailableOnly: b }),
  toggleIsAvailableOnly: () =>
    set((state) => ({ isAvailableOnly: !state.isAvailableOnly })),
  setCategoryId: (c) => set({ categoryId: c }),
  setBookStatus: (b) => set({ bookStatus: b }),
  setPriceRange: (p) => set({ priceRange: p }),
  setSort: (s) => set({ sort: s }),
  resetFilters: () =>
    set({
      isAvailableOnly: false,
      categoryId: null,
      bookStatus: null,
      priceRange: null,
    }),
}));
