// Components
import SignInForm from '../index';
import { useRouter } from 'next/navigation';

const mockOnSubmit = jest.fn();

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter: jest.fn(),
}));

const mockedUseRouter = useRouter as jest.Mock;

const props = {
  signIn: mockOnSubmit,
};

describe('SignInForm Component', () => {
  mockedUseRouter.mockReturnValue({
    pathname: '/',
    push: jest.fn(),
    replace: jest.fn(),
  });

  const renderComponent = () =>
    testLibJestUtils.render(<SignInForm {...props} />);

  it('should match with snapshot', () => {
    const component = renderComponent();

    expect(component).toMatchSnapshot();
  });

  it('should call onSubmit with correct data when form is valid', async () => {
    const { getByLabelText, getByRole } = renderComponent();

    // Fill form with valid data
    testLibJestUtils.fireEvent.change(getByLabelText(/Email Address/i), {
      target: { value: 'test@example.com' },
    });
    testLibJestUtils.fireEvent.change(getByLabelText(/Password/i), {
      target: { value: 'Password@123' },
    });

    // Submit the form
    testLibJestUtils.fireEvent.click(getByRole('button', { name: /Sign in/i }));

    // Wait for the form to submit and check the onSubmit was called with correct data
    await testLibJestUtils.waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        identifier: 'test@example.com',
        password: 'Password@123',
      });
    });
  });
});
