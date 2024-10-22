import { ThemeProvider } from 'next-themes';
import { render } from '@testing-library/react';

// components
import AccountSuccess from '../index';

describe('AccountSuccess Component', () => {
  it('should match snapshot in light theme', () => {
    const { asFragment } = render(
      <ThemeProvider attribute="class" defaultTheme="light">
        <AccountSuccess />
      </ThemeProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('should match snapshot in dark theme', () => {
    const { asFragment } = render(
      <ThemeProvider attribute="class" defaultTheme="dark">
        <AccountSuccess />
      </ThemeProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
