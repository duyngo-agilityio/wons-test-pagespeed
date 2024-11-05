import { render } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { withAccountState } from '../withAccountState';
import { ROLES } from '@/constants';

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(() => ({
    data: {
      user: {
        role: {
          id: 3,
        },
      },
    },
  })),
}));

const MockComponent = ({ isAdmin }: { isAdmin: boolean }) => (
  <div>{isAdmin ? 'Admin' : 'User'}</div>
);

const WrappedComponent = withAccountState(MockComponent);

describe('withAccountState HOC', () => {
  it('should pass isAdmin as true when user role matches the admin role', () => {
    // Mock the session to simulate an admin user
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: { role: { id: ROLES[0].id } }, // ROLES[0].id assumed to be admin role
      },
    });

    const { getByText } = render(<WrappedComponent />);

    expect(getByText('Admin')).toBeInTheDocument();
  });

  it('should pass isAdmin as false when user role does not match the admin role', () => {
    // Mock the session to simulate a non-admin user
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: { role: { id: 'some-non-admin-role-id' } },
      },
    });

    const { getByText } = render(<WrappedComponent />);

    expect(getByText('User')).toBeInTheDocument();
  });

  it('should pass isAdmin as false when there is no session', () => {
    // Mock the session as null (no session)
    (useSession as jest.Mock).mockReturnValue({ data: null });

    const { getByText } = render(<WrappedComponent />);

    expect(getByText('User')).toBeInTheDocument();
  });
});
