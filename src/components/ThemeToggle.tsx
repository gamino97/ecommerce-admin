'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { SidebarMenuButton } from '@/components/ui/sidebar';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <SidebarMenuButton onClick={toggleTheme} className="cursor-pointer">
      {theme === 'light' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</span>
    </SidebarMenuButton>
  );
}
