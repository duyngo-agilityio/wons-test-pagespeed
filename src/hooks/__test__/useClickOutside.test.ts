import { renderHook } from '@testing-library/react';
import useClickOutside from '../useClickOutside';

describe('useClickOutside', () => {
  let handlerMock: jest.Mock;
  let elementRef: React.RefObject<HTMLDivElement>;

  beforeEach(() => {
    handlerMock = jest.fn();
    elementRef = { current: document.createElement('div') };
    document.body.appendChild(elementRef.current as HTMLDivElement);
  });

  afterEach(() => {
    document.body.removeChild(elementRef.current as HTMLDivElement);
    jest.clearAllMocks();
  });

  const clickOutside = () => {
    document.body.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
  };

  const clickInside = () => {
    elementRef.current?.dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true }),
    );
  };

  it('should call handler when clicking outside the element', () => {
    renderHook(() => useClickOutside(elementRef, handlerMock));

    clickOutside();
    expect(handlerMock).toHaveBeenCalled();
  });

  it('should not call handler when clicking inside the element', () => {
    renderHook(() => useClickOutside(elementRef, handlerMock));

    clickInside();
    expect(handlerMock).not.toHaveBeenCalled();
  });
});
