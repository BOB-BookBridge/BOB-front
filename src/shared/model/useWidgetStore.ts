import { create } from 'zustand';

type WidgetType = 'chat' | 'notification' | null;

interface WidgetState {
  activeWidget: WidgetType;
  setActiveWidget: (widget: WidgetType) => void;
}
export const useWidgetStore = create<WidgetState>((set) => ({
  activeWidget: null,
  setActiveWidget: (widget) => set({ activeWidget: widget }),
}));
