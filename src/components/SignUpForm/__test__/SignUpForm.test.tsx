// Libs
import { fireEvent, screen } from '@testing-library/react';

// Mocks
import { SIGN_UP_FORM_DATA_MOCK } from '@/mocks';

// Types
import { ISignUpFormData } from '@/types';

// Constants
import { ERROR_MESSAGES } from '@/constants';

// Components
import SignUpForm, { ISignUpFormProps } from '../index';

const mockOnSubmit = jest.fn();

describe('SignUpForm', () => {
  const renderComponent = (props?: ISignUpFormProps) =>
    testLibJestUtils.render(<SignUpForm onSubmit={mockOnSubmit} {...props} />);

  const submitForm = ({
    fullName,
    email,
    username,
    password,
  }: ISignUpFormData) => {
    const FULL_NAME = screen.getByLabelText(/Full Name/i);
    const USERNAME = screen.getByLabelText(/Username/i);
    const EMAIL = screen.getByLabelText(/Email Address/i);
    const PASSWORD = screen.getByLabelText(/Password/i);
    const SHOW_PASSWORD_ICON = screen.getByTestId('show-password');
    const POLICY = screen.getByTestId('policy');

    // Fill form with valid data
    fireEvent.change(FULL_NAME, {
      target: { value: fullName },
    });
    fireEvent.blur(FULL_NAME);

    fireEvent.change(USERNAME, {
      target: { value: username },
    });
    fireEvent.blur(USERNAME);

    fireEvent.change(EMAIL, {
      target: { value: email },
    });
    fireEvent.blur(EMAIL);

    fireEvent.change(PASSWORD, {
      target: { value: password },
    });
    fireEvent.blur(PASSWORD);
    fireEvent.click(SHOW_PASSWORD_ICON);

    fireEvent.click(POLICY);

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Create account/i }));
  };

  it('should match snapshot for SignInForm', () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });

  it('should call onSubmit with correct data when form is valid', async () => {
    renderComponent();

    submitForm(SIGN_UP_FORM_DATA_MOCK);

    // Wait for the form to submit and check the onSubmit was called with correct data
    await testLibJestUtils.waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(SIGN_UP_FORM_DATA_MOCK);
    });
  });

  it('should show validation errors for empty fields', async () => {
    renderComponent();

    submitForm({
      email: 'email',
      password: 'abcd@123',
      fullName: '',
      username: '',
    });

    await testLibJestUtils.waitFor(() => {
      expect(ERROR_MESSAGES.FIELD_REQUIRED('Full Name')).toBeTruthy();
      expect(ERROR_MESSAGES.FIELD_REQUIRED('Username')).toBeTruthy();
      expect(ERROR_MESSAGES.FIELD_INVALID('Email Address')).toBeTruthy();
      expect(ERROR_MESSAGES.INVALID_PASSWORD).toBeTruthy();
    });
  });
});
