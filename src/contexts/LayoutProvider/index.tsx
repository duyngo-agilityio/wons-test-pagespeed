'use client';

import { ReactNode } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

// Constants
import { THEME_MODES } from '@/constants';

// Provider
import { ToastProvider } from '@/contexts';

interface ILayoutProvider {
  children: ReactNode;
}

const LayoutProvider = ({ children }: ILayoutProvider) => {
  const modeArr: string[] = Object.values(THEME_MODES);

  return (
    <NextUIProvider>
      <NextThemesProvider
        attribute="class"
        defaultTheme={THEME_MODES.LIGHT}
        themes={modeArr}
      >
        <ToastProvider> {children}</ToastProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
};

export default LayoutProvider;
