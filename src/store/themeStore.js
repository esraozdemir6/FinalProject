import { create } from "zustand";

export const useThemeStore = create((set) => ({
  isDark: false,
  toggleTheme: () => set((s) => ({ isDark: !s.isDark })),
  setTheme: (value) => set({ isDark: !!value }),
}));
