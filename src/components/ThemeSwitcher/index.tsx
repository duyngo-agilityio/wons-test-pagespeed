'use client';

// Libs
import { useCallback } from 'react';
import { useTheme } from 'next-themes';

// Constants
import { THEME_MODES } from '@/constants';

// Components
import { Button, FiSun, IoMoonOutline } from '@/components/common';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const handleToggleColorMode = useCallback(() => {
    if (theme === THEME_MODES.DARK) return setTheme(THEME_MODES.LIGHT);

    return setTheme(THEME_MODES.DARK);
  }, [setTheme, theme]);

  return (
    <Button
      isIconOnly
      aria-label="theme switcher"
      onClick={handleToggleColorMode}
      className="w-[52px] h-[52px] p-2 border border-blue-500 dark:border-blue/10 dark:border-white/10 !bg-white hover:!bg-white dark:!bg-gray-400 dark:hover:!bg-gray-400"
    >
      {theme === THEME_MODES.DARK ? (
        <FiSun className="w-6 h-6" />
      ) : (
        <IoMoonOutline className="w-6 h-6" />
      )}
    </Button>
  );
};

export default ThemeSwitcher;
