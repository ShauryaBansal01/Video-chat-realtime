import { create } from "zustand";

const DEFAULT_THEME = "streamify_daybreak";

const getInitialTheme = () => {
  if (typeof window === "undefined") return DEFAULT_THEME;
  return localStorage.getItem("streamify-theme") || document.documentElement.dataset.theme || DEFAULT_THEME;
};

export const useThemeStore = create((set) => ({
  theme: getInitialTheme(),
  setTheme: (theme) => {
    localStorage.setItem("streamify-theme", theme);
    document.documentElement.dataset.theme = theme;
    set({ theme });
  },
}));
