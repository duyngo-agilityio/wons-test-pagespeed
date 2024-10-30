import { act } from 'react';
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
        isReadOnly={false}
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

  it('match snapshot', async () => {
    const { container } = renderComponent();

    container.getElementsByClassName(
      'group h-10 align-middle whitespace-nowrap text-foreground-500 text-tiny font-semibold rtl:first:rounded-r-lg rtl:first:rounded-l-[unset] rtl:last:rounded-l-lg rtl:last:rounded-r-[unset] data-[sortable=true]:cursor-pointer data-[hover=true]:text-foreground-400 outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-start first:rounded-l-none last:rounded-r-none bg-gray-50 dark:bg-gray-600 px-[17px]',
    );

    container
      .querySelector('th.bg-gray-50')
      ?.setAttribute('data-key', 'row-header-column-tjima90t7ui');

    container
      .querySelector('th.bg-gray-50')
      ?.setAttribute('id', 'react-aria-:r0:-row-header-column-tjima90t7ui');

    await act(async () => {
      expect(container).toMatchSnapshot();
    });
  });

  it('should update selected invoice ids on selection change', async () => {
    const { getAllByRole } = renderComponent();

    const checkboxElements = getAllByRole('checkbox');
    const firstCheckbox = checkboxElements[0] as HTMLInputElement;

    fireEvent.click(firstCheckbox);

    await act(async () => {
      expect(firstCheckbox.checked).toBe(true);
    });
  });
});
