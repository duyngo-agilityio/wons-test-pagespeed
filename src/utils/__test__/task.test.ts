// Types
import { StrapiModel, Task, TaskStatus } from '@/types';

// Utils
import {
  convertTasksByStatus,
  formatFilterOptions,
  mapTaskStatusToStateKey,
} from '../task';

// Models
import { TUser } from '@/models';

// Mocks
import { MOCK_USERS } from '@/mocks';

describe('mapTaskStatusToStateKey', () => {
  it('should return "todo" for status "ToDo"', () => {
    expect(mapTaskStatusToStateKey(TaskStatus.Todo)).toBe('todo');
  });

  it('should return "inProgress" for status "In Progress"', () => {
    expect(mapTaskStatusToStateKey(TaskStatus.InProgress)).toBe('inProgress');
  });

  it('should return "inReview" for status "In Review"', () => {
    expect(mapTaskStatusToStateKey(TaskStatus.InReview)).toBe('inReview');
  });

  it('should return "done" for status "Done"', () => {
    expect(mapTaskStatusToStateKey(TaskStatus.Done)).toBe('done');
  });

  it('should throw an error for an unknown status', () => {
    expect(() => mapTaskStatusToStateKey('Unknown' as TaskStatus)).toThrow(
      'Unknown TaskStatus',
    );
  });
});

describe('convertTasksByStatus', () => {
  const mockTasks = [
    { id: 1, attributes: { label: 'todo' } },
    { id: 2, attributes: { label: 'inProgress' } },
    { id: 3, attributes: { label: 'inReview' } },
    { id: 4, attributes: { label: 'done' } },
    { id: 5, attributes: { label: 'todo' } },
  ] as StrapiModel<Task>[];

  it('should categorize tasks correctly by status labels', () => {
    const result = convertTasksByStatus(mockTasks);
    expect(result.todo.length).toBe(2);
    expect(result.inProgress.length).toBe(1);
    expect(result.inReview.length).toBe(1);
    expect(result.done.length).toBe(1);
  });

  it('should return empty arrays if no tasks match a category', () => {
    const result = convertTasksByStatus([]);
    expect(result.todo).toEqual([]);
    expect(result.inProgress).toEqual([]);
    expect(result.inReview).toEqual([]);
    expect(result.done).toEqual([]);
  });
});

describe('formatFilterOptions', () => {
  it('should format user data into filter options correctly', () => {
    const result = formatFilterOptions(MOCK_USERS);
    expect(result).toEqual([
      {
        id: 'list_1',
        title: 'Assignees',
        items: [
          { id: MOCK_USERS[0].username, content: MOCK_USERS[0].fullName },
          { id: MOCK_USERS[1].username, content: MOCK_USERS[1].fullName },
          { id: MOCK_USERS[2].username, content: MOCK_USERS[2].fullName },
        ],
      },
    ]);
  });

  it('should return an empty array if data is empty', () => {
    const result = formatFilterOptions([]);
    expect(result).toEqual([
      {
        id: 'list_1',
        title: 'Assignees',
        items: [],
      },
    ]);
  });

  it('should return an empty array if data is undefined', () => {
    const result = formatFilterOptions(undefined as unknown as TUser[]);
    expect(result).toEqual([]);
  });
});
