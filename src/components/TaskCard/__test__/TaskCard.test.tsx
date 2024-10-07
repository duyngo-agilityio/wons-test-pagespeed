import { render, screen } from '@testing-library/react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
// Mocks
import { MOCK_USERS } from '@/mocks';
// Components
import TaskCard from '..';
// eslint-disable-next-line react/display-name
jest.mock('next/image', () => ({ src, alt }: { src: string; alt: string }) => (
  <img src={src} alt={alt} />
));
const onDragEnd = jest.fn(); // Mock function for DragDropContext
// Helper to wrap the component inside DragDropContext and Droppable
const renderWithDndContext = (ui: React.ReactElement) => {
  return render(
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-1">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {ui}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>,
  );
};
describe('TaskCard Component', () => {
  const defaultProps = {
    title: 'Demo Task',
    description: 'This is a demo task description',
    id: 1,
    images: [],
    status: 'todo',
    index: 0,
  };
  it('matches the snapshot', () => {
    const { container } = renderWithDndContext(<TaskCard {...defaultProps} />);
    expect(container).toMatchSnapshot();
  });
  it('renders with one image correctly', () => {
    const images = [MOCK_USERS[0].avatar];
    renderWithDndContext(<TaskCard {...defaultProps} images={images} />);
    const image = screen.getByAltText(MOCK_USERS[0].fullName);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', images[0]);
  });
  it('renders title and description correctly', () => {
    renderWithDndContext(<TaskCard {...defaultProps} />);
    expect(screen.getByText('Demo Task')).toBeInTheDocument();
    expect(
      screen.getByText('This is a demo task description'),
    ).toBeInTheDocument();
  });
  it('renders with two images correctly', () => {
    const images = [MOCK_USERS[0].avatar, MOCK_USERS[1].avatar];
    renderWithDndContext(<TaskCard {...defaultProps} images={images} />);
    const imageElements = screen.getAllByAltText('Image Task');
    expect(imageElements.length).toBe(2);
    expect(imageElements[0]).toHaveAttribute('src', images[0]);
    expect(imageElements[1]).toHaveAttribute('src', images[1]);
  });
});
