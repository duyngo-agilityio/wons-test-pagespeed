import { render } from '@testing-library/react';

// Constants
import { IMAGES } from '@/constants';

// Components
import UserDetailClient from '../index';

const onEditMock = jest.fn();

const mockUser = {
  avatar: IMAGES.AVATAR_DEFAULT,
  username: 'admin',
  fullName: 'Super Admin',
  email: 'admin1@gmail.com',
  role: 'Admin',
};

describe('UserDetailClient', () => {
  const renderUserDetailClient = () =>
    render(<UserDetailClient user={mockUser} id={1} onEdit={onEditMock} />);

  it('render successful', () => {
    const { container } = renderUserDetailClient();

    // Check if the container is in the document
    expect(container).toBeInTheDocument();

    // Match the snapshot
    expect(container).toMatchSnapshot();
  });
});
