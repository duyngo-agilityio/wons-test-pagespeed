import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import { AvatarUpload } from '@/components';
import { TUpdateProfileProps } from '..';

// Constants
import { MAX_SIZE, MESSAGES } from '@/constants';

beforeAll(() => {
  global.URL.createObjectURL = jest.fn(() => '/new-preview-url');

  global.URL.revokeObjectURL = jest.fn();
});

describe('AvatarUpload Component', () => {
  const mockOnFileChange = jest.fn();
  const mockOnChange = jest.fn();

  const defaultProps: TUpdateProfileProps = {
    value: '',
    error: '',
    onFileChange: mockOnFileChange,
    onChange: mockOnChange,
    isDisabled: false,
    additionalClass: '',
  };

  const setup = (props = defaultProps) => render(<AvatarUpload {...props} />);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('revokes previous preview URL when a new file is selected', () => {
    setup();

    const input = screen.getByLabelText('Upload Avatar') as HTMLInputElement;

    // Simulate selecting the first file to set initial preview
    const firstFile = new File(['(⌐□_□)'], 'first-image.jpg', {
      type: 'image/jpeg',
    });
    fireEvent.change(input, { target: { files: [firstFile] } });

    expect(global.URL.createObjectURL).toHaveBeenCalledWith(firstFile);
    expect(mockOnFileChange).toHaveBeenCalledWith(firstFile);

    // Simulate selecting a new file to trigger URL revocation
    const secondFile = new File(['(⌐□_□)'], 'second-image.jpg', {
      type: 'image/jpeg',
    });
    fireEvent.change(input, { target: { files: [secondFile] } });

    // Verify revokeObjectURL was called with the previous URL
    expect(global.URL.revokeObjectURL).toHaveBeenCalledWith('/new-preview-url');
    expect(global.URL.createObjectURL).toHaveBeenCalledWith(secondFile);
    expect(mockOnFileChange).toHaveBeenCalledWith(secondFile);
  });

  it('renders camera icon when no image is selected', () => {
    setup();
    const cameraIcon = screen
      .getByTestId('avatar-upload-icon')
      .parentElement?.querySelector('svg');
    expect(cameraIcon).toBeInTheDocument();
  });

  it('shows preview image when an image URL is provided', () => {
    setup({ ...defaultProps, value: '/test-image-url.jpg' });
    const image = screen.getByTestId('avatar-preview');
    expect(image).toHaveAttribute(
      'src',
      expect.stringContaining('test-image-url.jpg'),
    );
  });

  it('displays error message when provided', () => {
    const error = 'Test error message';
    setup({ ...defaultProps, error });
    expect(screen.getByText(error)).toBeInTheDocument();
  });

  it('triggers onFileChange when a valid image file is selected', () => {
    const file = new File(['(⌐□_□)'], 'test-image.jpg', { type: 'image/jpeg' });
    setup();

    const input = screen.getByLabelText('Upload Avatar') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    expect(mockOnFileChange).toHaveBeenCalledWith(file);
  });

  it('shows error message if selected file is too large', () => {
    const largeFile = new File(['(⌐□_□)'], 'large-image.jpg', {
      type: 'image/jpeg',
    });
    Object.defineProperty(largeFile, 'size', { value: MAX_SIZE + 1 });

    setup();
    const input = screen.getByLabelText('Upload Avatar') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [largeFile] } });

    expect(
      screen.getByText(MESSAGES.ERROR.UPLOAD_IMAGE_SIZE),
    ).toBeInTheDocument();
    expect(mockOnFileChange).not.toHaveBeenCalled();
  });

  it('shows error message if selected file type is not an image', () => {
    const nonImageFile = new File(['(⌐□_□)'], 'test-file.txt', {
      type: 'text/plain',
    });

    setup();
    const input = screen.getByLabelText('Upload Avatar') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [nonImageFile] } });

    expect(screen.getByText(MESSAGES.ERROR.UPLOAD_IMAGE)).toBeInTheDocument();
    expect(mockOnFileChange).not.toHaveBeenCalled();
  });

  it('calls onChange when a file is selected', () => {
    const file = new File(['(⌐□_□)'], 'test-image.jpg', { type: 'image/jpeg' });

    setup();
    const input = screen.getByLabelText('Upload Avatar') as HTMLInputElement;
    fireEvent.change(input, { target: { files: [file] } });

    expect(mockOnChange).toHaveBeenCalled();
  });

  it('does not allow file upload when isDisabled is true', () => {
    setup({ ...defaultProps, isDisabled: true });

    const input = screen.getByLabelText('Upload Avatar') as HTMLInputElement;
    expect(input).toBeDisabled();
  });

  it('does not trigger onFileChange if no file is selected', () => {
    setup();

    const input = screen.getByLabelText('Upload Avatar') as HTMLInputElement;
    fireEvent.change(input, { target: { files: null } });

    expect(mockOnFileChange).not.toHaveBeenCalled();
  });

  it('matches the snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
