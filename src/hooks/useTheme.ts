import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const STORAGE_KEY = 'raila-theme';

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function storedTheme(): Theme | null {
  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch {
    // Private browsing / blocked storage — fall back to the system preference.
    return null;
  }
}

function apply(theme: Theme) {
  document.documentElement.classList.toggle('dark', theme === 'dark');
  document.documentElement.style.colorScheme = theme;
}

/**
 * Light/dark theme, defaulting to the OS preference and following it until the
 * visitor picks a side, at which point the choice is remembered.
 */
export default function useTheme(): { theme: Theme; toggleTheme: () => void } {
  const [theme, setTheme] = useState<Theme>(() => storedTheme() ?? systemTheme());

  useEffect(() => {
    apply(theme);
  }, [theme]);

  useEffect(() => {
    // Reduced-motion is a document-level flag so CSS can opt out of reveals.
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotion = () => document.documentElement.classList.toggle('no-motion', motion.matches);
    syncMotion();
    motion.addEventListener('change', syncMotion);

    const scheme = window.matchMedia('(prefers-color-scheme: dark)');
    const syncScheme = () => {
      if (!storedTheme()) setTheme(scheme.matches ? 'dark' : 'light');
    };
    scheme.addEventListener('change', syncScheme);

    return () => {
      motion.removeEventListener('change', syncMotion);
      scheme.removeEventListener('change', syncScheme);
    };
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === 'dark' ? 'light' : 'dark';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Non-fatal: the theme still applies for this session.
      }
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
