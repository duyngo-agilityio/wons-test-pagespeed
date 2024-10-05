import { DragDropContext, Droppable } from '@hello-pangea/dnd';

// Mocks
import { MOCK_TASKS } from '@/mocks';

// Components
import TaskCard from '..';

jest.mock('@hello-pangea/dnd');

const onDragEnd = jest.fn(); // Mock function for DragDropContext

// Helper to wrap the component inside DragDropContext and Droppable
const renderWithDndContext = (ui: React.ReactElement) => {
  return testLibJestUtils.render(
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
  const { todo } = MOCK_TASKS;

  it('matches the snapshot', () => {
    const { container } = renderWithDndContext(
      <TaskCard index={0} task={todo[0]} />,
    );

    expect(container).toMatchSnapshot();
  });
});
