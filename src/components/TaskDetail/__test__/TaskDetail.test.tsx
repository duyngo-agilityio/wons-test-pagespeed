import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import TaskDetail from '../index';

// Types
import { Level, TLabelStatus } from '@/types';

// mocks
import { MOCK_ASSIGNEES } from '@/mocks';

describe('TaskDetail Component', () => {
  const mockRenderImages = jest.fn(() => <div>Images</div>);

  const defaultProps = {
    title: 'Sample Task',
    level: Level.Medium,
    description: 'This is a sample task description',
    assignees: MOCK_ASSIGNEES,
    renderImages: mockRenderImages,
    label: 'InProgress' as TLabelStatus,
    isOpen: true,
    onCloseModal: jest.fn(),
    imageCount: 2,
  };

  const setup = (props = defaultProps) => render(<TaskDetail {...props} />);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders Task Details modal title', () => {
    setup();
    expect(screen.getByText('Task Details')).toBeInTheDocument();
  });

  it('calls renderImages when imageCount is greater than 0', () => {
    setup();
    expect(mockRenderImages).toHaveBeenCalled();
  });

  it('does not render image section when imageCount is 0', () => {
    setup({ ...defaultProps, imageCount: 0 });
    expect(screen.queryByText('Images')).not.toBeInTheDocument();
    expect(mockRenderImages).not.toHaveBeenCalled();
  });

  it('calls onCloseModal when modal is closed', () => {
    const mockOnCloseModal = jest.fn();
    setup({ ...defaultProps, onCloseModal: mockOnCloseModal });

    // Simulate modal close
    mockOnCloseModal();
    expect(mockOnCloseModal).toHaveBeenCalled();
  });

  it('matches snapshot', () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });
});
