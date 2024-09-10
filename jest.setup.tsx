import '@testing-library/jest-dom';
import React from 'react';
import * as jestFunc from '@testing-library/react';

// Contexts
import { LayoutProvider } from '@/contexts';

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

      return (
        <LayoutProvider>
          <CustomWrapper>{children}</CustomWrapper>
        </LayoutProvider>
      );
    },
  });

globalThis.testLibJestUtils = { ...jestFunc, render: customRender };

// eslint-disable-next-line import/no-anonymous-default-export
export default { ...jestFunc, render: customRender };
