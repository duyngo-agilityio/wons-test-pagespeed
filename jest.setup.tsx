import '@testing-library/jest-dom';
import React from 'react';
import * as jestFunc from '@testing-library/react';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

// Constants
import { THEME_MODES } from '@/constants';

import ResizeObserver from 'resize-observer-polyfill';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();
window.ResizeObserver = ResizeObserver;

Math.random = () => 1;

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const mockReplace = jest.fn();

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: jest.fn(() => ({ replace: mockReplace })),
}));

const customRender = <
  Q extends jestFunc.Queries = typeof jestFunc.queries,
  Container extends Element | DocumentFragment = HTMLElement,
  BaseElement extends Element | DocumentFragment = Container,
>(
  ui: React.ReactNode,
  options?: jestFunc.RenderOptions<Q, Container, BaseElement>,
) =>
  jestFunc.render(ui, {
    ...options,
    wrapper: ({ children }: { children: React.ReactNode }) => {
      const CustomWrapper = options?.wrapper
        ? options.wrapper
        : ({ children }: { children: React.ReactNode }) => children;

      const modeArr: string[] = Object.values(THEME_MODES);

      return (
        <NextUIProvider>
          <NextThemesProvider
            attribute="class"
            defaultTheme={THEME_MODES.LIGHT}
            themes={modeArr}
          >
            <CustomWrapper>{children}</CustomWrapper>
          </NextThemesProvider>
        </NextUIProvider>
      );
    },
  });

globalThis.testLibJestUtils = { ...jestFunc, render: customRender };

// eslint-disable-next-line import/no-anonymous-default-export
export default { ...jestFunc, render: customRender };
