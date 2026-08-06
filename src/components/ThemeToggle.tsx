import React from 'react';
import { Moon, Sun } from 'lucide-react';
import type { Theme } from '../hooks/useTheme';

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle, className = '' }) => (
  <button
    type="button"
    onClick={onToggle}
    aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    className={`inline-flex h-8 w-8 items-center justify-center text-muted transition-colors duration-300 hover:text-accent ${className}`}
  >
    {theme === 'dark' ? <Sun size={15} strokeWidth={1.5} /> : <Moon size={15} strokeWidth={1.5} />}
  </button>
);

export default ThemeToggle;
