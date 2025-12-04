import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { BookStatus, SearchKey, SortKey } from '@/entities/listing/types';

type FilterState = {
  key: SearchKey;
  keyword: string | null;
  emdId: number | undefined;
  isAvailableOnly: boolean;
  categoryId: number | null;
  bookStatus: BookStatus | null;
  priceRange: number | null;
  sort: SortKey;
  setKey: (e: SearchKey) => void;
  setKeyword: (e: string | null) => void;
  setEmdId: (e: number | undefined) => void;
  setIsAvailableOnly: (b: boolean) => void;
  toggleIsAvailableOnly: () => void;
  setCategoryId: (c: number | null) => void;
  setBookStatus: (b: BookStatus | null) => void;
  setPriceRange: (p: number | null) => void;
  setSort: (s: SortKey) => void;
  resetFilters: () => void;
};

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      key: '통합',
      keyword: null,
      emdId: undefined,
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
    }),
    {
      name: 'filter-storage',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ emdId: state.emdId }),
    },
  ),
);
