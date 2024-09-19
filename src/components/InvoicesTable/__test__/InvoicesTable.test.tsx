import { fireEvent } from '@testing-library/react';

// Mocks
import { MOCK_INVOICES_WITH_CUSTOMER } from '@/mocks';

// Components
import InvoicesTable from '../index';

const mockOnDelete = jest.fn();
const mockOnRowAction = jest.fn();
const mockOnDeleteMultiple = jest.fn();
const mockOnEdit = jest.fn();
const mockOnSort = jest.fn();
const mockOnToggleSelectStar = jest.fn();

describe('InvoicesTable Component', () => {
  const renderComponent = () =>
    testLibJestUtils.render(
      <InvoicesTable
        data={MOCK_INVOICES_WITH_CUSTOMER}
        onDelete={mockOnDelete}
        onDeleteMultiple={mockOnDeleteMultiple}
        onEdit={mockOnEdit}
        onSort={mockOnSort}
        onToggleSelectStar={mockOnToggleSelectStar}
        pageCount={2}
        onRowAction={mockOnRowAction}
      />,
    );

  it('match snapshot', () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });

  it('should update selected invoice ids on selection change', () => {
    const { getAllByRole } = renderComponent();

    const checkboxElements = getAllByRole('checkbox');
    const firstCheckbox = checkboxElements[0] as HTMLInputElement;

    fireEvent.click(firstCheckbox);

    expect(firstCheckbox.checked).toBe(true);
  });
});
