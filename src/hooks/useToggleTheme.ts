// hooks/useDarkMode.js
import type { Dispatch, SetStateAction } from "react";
import { useCallback, useEffect } from "react";

const noopDispatch: Dispatch<SetStateAction<boolean>> = () => {
  // no-op: dark mode is disabled for the entire app
};

export default function useDarkMode(): [boolean, Dispatch<SetStateAction<boolean>>] {
  // Intentionally keep the app in light mode by default.
  // Some UI components expect a "toggle" setter, but dark mode is disabled.
  const isDarkMode = false;

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("dark");
    // Best-effort: keep localStorage consistent with light mode.
    try {
      localStorage.setItem("theme", "light");
    } catch {
      // Ignore storage errors (private mode, blocked storage, etc.)
    }
  }, []);

  const setIsDarkMode = useCallback(noopDispatch, []);

  return [isDarkMode, setIsDarkMode];
}
