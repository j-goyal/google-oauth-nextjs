import { create } from "zustand";

interface GlobalLoaderState {
  isVisible: boolean;
  showLoader: () => void;
  hideLoader: () => void;
}

export const useGlobalLoader = create<GlobalLoaderState>((set) => ({
  isVisible: false,
  showLoader: () => set({ isVisible: true }),
  hideLoader: () => set({ isVisible: false }),
}));
