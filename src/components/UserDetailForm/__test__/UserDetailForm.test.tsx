import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Constants
import { IMAGES } from '@/constants';

// Components
import UserDetailForm from '../index';

window.URL.createObjectURL = jest.fn();
const onAvatarChangeMock = jest.fn();
const onSubmitMock = jest.fn();
const onCancelMock = jest.fn();
const mockUser = {
  avatar: IMAGES.AVATAR_DEFAULT,
  username: 'admin',
  fullName: 'Super Admin',
  email: 'admin1@gmail.com',
  role: 'Admin',
};

describe('UserDetail', () => {
  const renderUserDetailForm = () =>
    render(
      <UserDetailForm
        user={mockUser}
        onAvatarChange={onAvatarChangeMock}
        onSubmit={onSubmitMock}
        onCancel={onCancelMock}
      />,
    );

  beforeEach(() => {
    jest.clearAllMocks();
    renderUserDetailForm();
  });

  test('render successful', () => {
    const { container } = renderUserDetailForm();

    // Check if the container is in the document
    expect(container).toBeInTheDocument();

    // Match the snapshot
    expect(container).toMatchSnapshot();
  });

  it('submits the form with data', async () => {
    const nameInput = screen.getByRole('textbox', {
      name: /full name full name/i,
    });

    fireEvent.change(nameInput, { target: { value: 'My Name' } });

    const emailInput = screen.getByRole('textbox', { name: /email email/i });

    fireEvent.change(emailInput, { target: { value: 'example@gmail.com' } });

    const buttonSave = screen.getByRole('button', { name: /save/i });

    await waitFor(() => {
      expect(buttonSave).toBeEnabled();
    });

    // Simulate clicking the submit button
    fireEvent.click(buttonSave);

    // Wait for the onSubmitMock to be called
    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalled();
    });
  });

  it('is upload avatar successful', async () => {
    const avatarInput = screen.getByTestId('avatar-upload');

    // Simulate uploading a file
    const file = new File(['image'], 'test.png', { type: 'image/png' });

    await userEvent.upload(avatarInput, file);

    const avatarPreview = screen.getByTestId('avatar-preview'); // Assuming alt text for the preview image is set

    expect(avatarPreview).toBeInTheDocument();
  });

  it('is the save button disabled', async () => {
    const nameInput = screen.getByRole('textbox', {
      name: /full name full name/i,
    });

    // Simulate clear input field
    fireEvent.change(nameInput, { target: { value: '' } });

    const buttonSave = screen.getByRole('button', { name: /save/i });

    // Wait for the button submit to be disabled
    await waitFor(() => {
      expect(buttonSave).toBeDisabled();
    });
  });
});
