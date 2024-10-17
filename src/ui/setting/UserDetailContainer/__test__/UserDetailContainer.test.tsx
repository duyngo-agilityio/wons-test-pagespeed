import { auth } from '@/configs';

// Actions
import { updateUser } from '@/actions';

// APIs
import { getProfile } from '@/api';

// Constants
import { ROLES } from '@/constants';

// Components
import UserDetailContainer from '..';

jest.mock('@/configs', () => ({
  auth: jest.fn(),
}));

jest.mock('@/actions', () => ({
  updateUser: jest.fn(),
}));

jest.mock('@/api', () => ({
  getProfile: jest.fn(),
}));

describe('UserDetailContainer', () => {
  const mockUser = {
    token: 'mock-token',
    id: 123,
  };

  const mockProfile = {
    avatar: 'mock-avatar-url',
    email: 'mock-email@example.com',
    role: { name: ROLES[0].name },
    fullName: 'Mock Full Name',
    username: 'mockUsername',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches user data and returns UserDetailClient component with correct props', async () => {
    // Mock the auth and getProfile functions
    (auth as jest.Mock).mockResolvedValueOnce({ user: mockUser });
    (getProfile as jest.Mock).mockResolvedValueOnce(mockProfile);

    // Call the component function (since it's async) and wait for the result
    const component = await UserDetailContainer();

    // Check that the component contains the correct props
    expect(component.props.user).toEqual({
      avatar: 'mock-avatar-url',
      email: 'mock-email@example.com',
      fullName: 'Mock Full Name',
      username: 'mockUsername',
      role: ROLES[0].name,
    });
    expect(component.props.id).toBe(123);
    expect(component.props.onEdit).toBe(updateUser);

    // Assert that the API calls were made
    expect(auth).toHaveBeenCalled();
    expect(getProfile).toHaveBeenCalledWith('mock-token');
  });
});
