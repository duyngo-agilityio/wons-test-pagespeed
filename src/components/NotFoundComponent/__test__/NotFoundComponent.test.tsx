import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Constants
import { ROUTES } from '@/constants';

// Components
import NotFoundComponent from '../index';

describe('NotFoundComponent', () => {
  it('renders Not Found title and error message', () => {
    render(<NotFoundComponent />);

    expect(screen.getByText('Not Found')).toBeInTheDocument();
    expect(
      screen.getByText('Could not find requested resource'),
    ).toBeInTheDocument();
  });

  it('renders link to return home with correct route', () => {
    render(<NotFoundComponent />);

    const link = screen.getByRole('link', { name: /return home/i });
    expect(link).toHaveAttribute('href', ROUTES.DASHBOARD);
  });

  it('renders the button with correct text', () => {
    render(<NotFoundComponent />);

    const button = screen.getByText('Return Home');
    expect(button).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { container } = render(<NotFoundComponent />);
    expect(container).toMatchSnapshot();
  });
});
