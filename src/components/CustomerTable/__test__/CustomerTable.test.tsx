import { render, screen } from '@testing-library/react';

// types
import { TCustomerDataResponse } from '@/types';

// mocks
import { CUSTOMER_MOCK } from '@/mocks';

// components
import CustomersTable from '../index';

// Constants
import { DEFAULT_PAGE } from '@/constants';

const mockCustomersData: TCustomerDataResponse[] = [
  {
    id: 1,
    attributes: CUSTOMER_MOCK[0],
  },
  {
    id: 2,
    attributes: CUSTOMER_MOCK[1],
  },
];

describe('CustomersTable Component', () => {
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  it('renders the table headers and customer data correctly', () => {
    const { container } = render(
      <CustomersTable
        onSort={jest.fn()}
        isReadOnly={false}
        data={mockCustomersData}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        pageCount={DEFAULT_PAGE}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders correctly with undefined attributes', () => {
    render(
      <CustomersTable
        onSort={jest.fn()}
        data={undefined as unknown as TCustomerDataResponse[]}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        pageCount={DEFAULT_PAGE}
      />,
    );

    expect(screen.getAllByText('')).toHaveLength(31);
  });

  it('renders correctly with empty attributes', () => {
    render(
      <CustomersTable
        onSort={jest.fn()}
        data={[]}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        pageCount={DEFAULT_PAGE}
      />,
    );

    expect(screen.getAllByText('')[1]).toBeInTheDocument();
  });
});
