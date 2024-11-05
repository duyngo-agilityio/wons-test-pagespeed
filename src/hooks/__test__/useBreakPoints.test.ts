import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { useBreakPoints } from '../useBreakPoints';

describe('useBreakPoints', () => {
  beforeEach(() => {
    // Mock window.innerWidth
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 0,
    });

    // Mock the resize event listener
    global.dispatchEvent = jest.fn();
  });

  const resizeWindow = (width: number) => {
    window.innerWidth = width;
    global.dispatchEvent(new Event('resize'));
  };

  it('should return correct values for each breakpoint', () => {
    const { result } = renderHook(() => useBreakPoints());

    act(() => resizeWindow(500));
    expect(result.current.isGreaterThanSm).toBe(false);
    expect(result.current.isSmOrLess).toBe(true);

    act(() => resizeWindow(640)); // Adjust according to your config's breakpoints
    expect(result.current.isGreaterThanSm).toBe(false);
    expect(result.current.isSmOrLess).toBe(true);

    act(() => resizeWindow(768));
    expect(result.current.isGreaterThanMd).toBe(false);
    expect(result.current.isMdOrLess).toBe(true);

    // Additional tests for each breakpoint...

    act(() => resizeWindow(1536));
    expect(result.current.isGreaterThan2Xl).toBe(false);
    expect(result.current.isXlOrLess).toBe(true);
  });
});
