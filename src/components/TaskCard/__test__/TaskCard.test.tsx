import { render, screen } from '@testing-library/react';

// Mocks
import { MOCK_USERS } from '@/mocks';

// Components
import TaskCard from '..';

// eslint-disable-next-line react/display-name
jest.mock('next/image', () => ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} />
));

// Snapshot and other tests
describe('TaskCard Component', () => {
  const defaultProps = {
    title: 'Demo Task',
    description: 'This is a demo task description',
  };

  it('matches the snapshot', () => {
    const { container } = render(<TaskCard {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });

  it('renders with one image correctly', () => {
    const images = [MOCK_USERS[0].avatar];
    render(<TaskCard {...defaultProps} images={images} />);

    const image = screen.getByAltText(MOCK_USERS[0].fullName);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', images[0]);
  });

  it('renders title and description correctly', () => {
    render(<TaskCard {...defaultProps} />);

    expect(screen.getByText('Demo Task')).toBeInTheDocument();
    expect(
      screen.getByText('This is a demo task description'),
    ).toBeInTheDocument();
  });

  it('renders with two images correctly', () => {
    const images = [MOCK_USERS[0].avatar, MOCK_USERS[1].avatar];
    render(<TaskCard {...defaultProps} images={images} />);

    const imageElements = screen.getAllByAltText('Image Task');
    expect(imageElements.length).toBe(2);
    expect(imageElements[0]).toHaveAttribute('src', images[0]);
    expect(imageElements[1]).toHaveAttribute('src', images[1]);
  });
});
