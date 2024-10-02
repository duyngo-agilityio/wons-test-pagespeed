import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// components
import { CustomerForm } from '@/components';

// utils
import * as utils from '@/utils';

const mockOnSubmit = jest.fn();
const mockOnAvatarChange = jest.fn();

jest.mock('@/utils', () => ({
  ...jest.requireActual('@/utils'),
  uploadImage: jest.fn(),
  clearPhoneNumberFormat: jest.fn(),
  formatPhoneNumberTyping: jest.fn(),
}));

const renderComponent = (props = {}) => {
  return render(
    <CustomerForm
      onSubmit={mockOnSubmit}
      onAvatarChange={mockOnAvatarChange}
      setReset={jest.fn()}
      {...props}
    />,
  );
};

describe('CustomerForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.URL.createObjectURL = jest.fn();
  });

  it('renders CustomerForm with content', () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });

  it('renders without crashing', () => {
    const { getByLabelText } = renderComponent();
    expect(getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(getByLabelText(/Last Name/i)).toBeInTheDocument();
  });

  it('submits the form with valid data including avatar change', async () => {
    const { getByLabelText, getByRole } = renderComponent();

    await userEvent.type(getByLabelText(/First Name/i), 'John');
    await userEvent.type(getByLabelText(/Last Name/i), 'Doe');
    await userEvent.type(
      getByLabelText(/Email Address/i),
      'john.doe@example.com',
    );

    const formattedPhoneNumber = '1234567891';
    (utils.formatPhoneNumberTyping as jest.Mock).mockReturnValue(
      formattedPhoneNumber,
    );
    (utils.clearPhoneNumberFormat as jest.Mock).mockReturnValue(
      formattedPhoneNumber,
    );

    await userEvent.type(getByLabelText(/Phone Number/i), '1234567891');

    const avatarInput = getByLabelText(/Upload Avatar/i);
    await userEvent.upload(
      avatarInput,
      new File(['image'], 'test.png', { type: 'image/png' }),
    );

    await userEvent.selectOptions(
      getByLabelText(/Gender/i, { selector: 'select' }),
      'male',
    );

    const submitButton = getByRole('button', { name: /Add Customer/i });
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          phone: formattedPhoneNumber,
          gender: 'male',
          avatar: expect.any(String),
        }),
      );
    });
  });

  it('disables the submit button when fields are invalid', async () => {
    const { getByRole } = renderComponent();

    fireEvent.click(getByRole('button', { name: /Add Customer/i }));

    await waitFor(() => {
      expect(getByRole('button', { name: /Add Customer/i })).toBeDisabled();
    });
  });

  it('renders correct title for Add Customer', () => {
    const { getAllByText } = renderComponent();
    expect(getAllByText(/Add Customer/i).length).toBeGreaterThan(0);
  });

  it('renders correct title for Update Customer', () => {
    const { getAllByText } = renderComponent({ isEdit: true });
    expect(getAllByText(/Update Customer/i).length).toBeGreaterThan(0);
  });
});
