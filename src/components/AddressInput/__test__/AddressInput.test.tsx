import { fireEvent, render } from '@testing-library/react';

// Components
import AddressInput from '..';

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useSearchParams: jest.fn(() => ({
    get: () => () => 'John Deo',
  })),
}));

jest.mock('@/services', () => ({
  getLocationSuggestion: jest.fn().mockResolvedValue({
    features: [
      { properties: { formatted: '123 Main St', name: 'Location1' } },
      { properties: { formatted: '456 Elm St', name: 'Location2' } },
    ],
  }),
}));

describe('AddressInput component', () => {
  it('matches snapshot', () => {
    const { container } = render(
      <AddressInput onChange={jest.fn()} label="Address" />,
    );

    expect(container).toMatchSnapshot();
  });

  it('calls onChange when typing in input', () => {
    const handleChange = jest.fn();

    const { getByPlaceholderText } = render(
      <AddressInput
        label="Address"
        value=""
        onChange={handleChange}
        placeholder="Enter your address"
      />,
    );

    const inputElement = getByPlaceholderText('Enter your address');
    fireEvent.change(inputElement, { target: { value: 'New Address' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(inputElement).toHaveValue('New Address');
  });
});
