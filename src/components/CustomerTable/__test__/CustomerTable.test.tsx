import { render, screen } from '@testing-library/react';

// types
import { TCustomerDataResponse } from '@/types';

// mocks
import { CUSTOMER_MOCK } from '@/mocks';

// components
import CustomersTable from '../index';
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
  const mockOnToggleSelectStar = jest.fn();

  it('renders the table headers and customer data correctly', () => {
    const { container } = render(
      <CustomersTable
        data={mockCustomersData}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleSelectStar={mockOnToggleSelectStar}
        pageCount={DEFAULT_PAGE}
      />,
    );

    expect(container).toMatchSnapshot();
  });

  it('renders correctly with undefined attributes', () => {
    render(
      <CustomersTable
        data={undefined as unknown as TCustomerDataResponse[]}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleSelectStar={mockOnToggleSelectStar}
        pageCount={DEFAULT_PAGE}
      />,
    );

    expect(screen.getAllByText('')).toHaveLength(33);
  });

  it('renders correctly with empty attributes', () => {
    render(
      <CustomersTable
        data={[]}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleSelectStar={mockOnToggleSelectStar}
        pageCount={DEFAULT_PAGE}
      />,
    );

    expect(screen.getAllByText('')[1]).toBeInTheDocument();
  });
});
