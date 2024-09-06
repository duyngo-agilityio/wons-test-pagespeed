import { ERROR_MESSAGES } from '@/constants';

// Components
import SignInForm from '../index';

const mockOnSubmit = jest.fn();

const props = {
  onSubmit: mockOnSubmit,
};

describe('SignInForm', () => {
  const renderComponent = () =>
    testLibJestUtils.render(<SignInForm {...props} />);

  it('should match snapshot for SignInForm', () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });

  it('should call onSubmit with correct data when form is valid', async () => {
    const { getByLabelText, getByRole } = renderComponent();

    // Fill form with valid data
    testLibJestUtils.fireEvent.change(getByLabelText(/Email Address/i), {
      target: { value: 'test@example.com' },
    });
    testLibJestUtils.fireEvent.change(getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });

    // Submit the form
    testLibJestUtils.fireEvent.click(getByRole('button', { name: /Log In/i }));

    // Wait for the form to submit and check the onSubmit was called with correct data
    await testLibJestUtils.waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        identifier: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it.skip('should show validation errors for empty fields', async () => {
    const { getByRole, findByText, getByLabelText } = renderComponent();

    testLibJestUtils.fireEvent.change(getByLabelText(/Email Address/i), {
      target: { value: 'test' },
    });

    testLibJestUtils.fireEvent.change(getByLabelText(/Password/i), {
      target: { value: 'password123' },
    });

    // Simulate form submission without filling fields
    testLibJestUtils.fireEvent.click(getByRole('button', { name: /Log in/i }));

    // Check for validation messages
    expect(
      await findByText(ERROR_MESSAGES.FIELD_INVALID('Email')),
    ).toBeInTheDocument();
  });
});
