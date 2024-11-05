import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import LocationSuggestion from '../index';

describe('LocationSuggestion Component', () => {
  const mockOnClickSuggestion = jest.fn();
  const formatted = '123 Test Street, Test City';

  const setup = () =>
    render(
      <LocationSuggestion
        onClickSuggestion={mockOnClickSuggestion}
        formatted={formatted}
      />,
    );

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with location text and icon', () => {
    setup();

    expect(screen.getByText(formatted)).toBeInTheDocument();
    expect(screen.getByTestId('location-icon')).toBeInTheDocument();
  });

  it('calls onClickSuggestion with formatted text when clicked', () => {
    setup();

    const suggestionDiv = screen.getByText(formatted);
    fireEvent.click(suggestionDiv);

    expect(mockOnClickSuggestion).toHaveBeenCalledWith(formatted);
  });

  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
