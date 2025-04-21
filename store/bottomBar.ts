import { create } from 'zustand';

type UIState = {
  bottomBarEnabled: boolean;
  setBottomBarEnabled: (v: boolean) => void;
};

export const useUIStore = create<UIIState>((set) => ({
  bottomBarEnabled: false,
  setBottomBarEnabled: (v) => set({ bottomBarEnabled: v }),
}));
