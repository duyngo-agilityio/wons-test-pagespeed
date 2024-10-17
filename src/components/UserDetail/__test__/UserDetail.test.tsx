import { render } from '@testing-library/react';

// Constants
import { IMAGES } from '@/constants';

// Components
import UserDetail from '../index';

const mockUser = {
  avatar: IMAGES.AVATAR_DEFAULT,
  username: 'admin',
  fullName: 'Super Admin',
  email: 'admin1@gmail.com',
  role: 'Admin',
};

const onButtonEditClickMock = jest.fn();

describe('UserDetail', () => {
  const renderUserDetailComponent = () =>
    render(
      <UserDetail
        avatar={mockUser.avatar}
        username={mockUser.username}
        role={mockUser.role}
        email={mockUser.email}
        fullName={mockUser.fullName}
        onButtonEditClick={onButtonEditClickMock}
      />,
    );

  it('render successful', () => {
    const { container } = renderUserDetailComponent();

    // Check if the container is in the document
    expect(container).toBeInTheDocument();

    // Match the snapshot
    expect(container).toMatchSnapshot();
  });
});
