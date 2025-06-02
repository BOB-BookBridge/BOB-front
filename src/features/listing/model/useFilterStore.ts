import { create } from 'zustand';

type FilterState = {
  emdId: number | null;
  isAvailableOnly: boolean;
  categoryId: number | null;
  priceRange: number | null;
  setEmdId: (e: number | null) => void;
  setIsAvailableOnly: (a: boolean) => void;
  setCategoryId: (c: number | null) => void;
  setPriceRange: (p: number | null) => void;
  resetFilters: () => void;
};

export const useFilterStore = create<FilterState>((set) => ({
  emdId: null,
  isAvailableOnly: false,
  categoryId: null,
  priceRange: null,
  setEmdId: (e) => set({ emdId: e }),
  setIsAvailableOnly: (a) => set({ isAvailableOnly: a }),
  setCategoryId: (c) => set({ categoryId: c }),
  setPriceRange: (p) => set({ priceRange: p }),
  resetFilters: () =>
    set({ isAvailableOnly: false, categoryId: null, priceRange: null }),
}));
