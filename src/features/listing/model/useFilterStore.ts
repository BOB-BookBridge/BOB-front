import { BookStatus, SearchKey, SortKey } from '@/entities/listing/types';
import { create } from 'zustand';

type FilterState = {
  key: SearchKey;
  keyword: string | null;
  emdId: number | null;
  isAvailableOnly: boolean;
  categoryId: number | null;
  bookStatus: BookStatus | null;
  priceRange: number | null;
  sort: SortKey;
  setKey: (e: SearchKey) => void;
  setKeyword: (e: string | null) => void;
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
  key: '통합',
  keyword: null,
  emdId: null,
  isAvailableOnly: false,
  categoryId: null,
  bookStatus: null,
  priceRange: null,
  sort: 'RECENT',
  setKey: (k) => set({ key: k }),
  setKeyword: (k) => set({ keyword: k }),
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
      key: '통합',
      keyword: null,
      isAvailableOnly: false,
      categoryId: null,
      bookStatus: null,
      priceRange: null,
    }),
}));
