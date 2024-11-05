import { render } from '@testing-library/react';
import TaskStatusComponent from '../index';

// Types
import { TLabelStatus } from '@/types';

describe('TaskStatusComponent Snapshot', () => {
  it('matches snapshot with "todo" status', () => {
    const { container } = render(
      <TaskStatusComponent status={'todo' as TLabelStatus} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot with default styles for invalid status', () => {
    const { container } = render(
      <TaskStatusComponent status={'invalidStatus' as TLabelStatus} />,
    );
    expect(container).toMatchSnapshot();
  });
});
