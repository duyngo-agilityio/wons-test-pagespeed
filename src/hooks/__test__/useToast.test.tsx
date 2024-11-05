import { ToastContext, TToastContext } from '@/contexts/ToastProvider';
import { renderHook } from '@testing-library/react';
import { useToast } from '../useToast';

describe('useToast', () => {
  it('should return the value from ToastContext', () => {
    // Create a mock value for ToastContext
    const mockContextValue: TToastContext = {
      showToast: jest.fn(),
      closeToast: jest.fn(),
      toasts: [],
    };

    // Wrap the hook in a context provider with the mock value
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ToastContext.Provider value={mockContextValue}>
        {children}
      </ToastContext.Provider>
    );

    // Render the hook with the wrapper
    const { result } = renderHook(() => useToast(), { wrapper });

    // Assert that the hook returns the mocked context value
    expect(result.current).toBe(mockContextValue);
  });
});
