import { render, screen } from '@testing-library/react';

// types
import { TCustomerDataResponse } from '@/types';

// mocks
import { CUSTOMER_MOCK } from '@/mocks';

// components
import CustomersTable from '../index';

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
      />,
    );

    expect(screen.getAllByText('')).toHaveLength(24);
  });

  it('renders correctly with empty attributes', () => {
    render(
      <CustomersTable
        data={[]}
        onEdit={mockOnEdit}
        onDelete={mockOnDelete}
        onToggleSelectStar={mockOnToggleSelectStar}
      />,
    );

    expect(screen.getAllByText('')[1]).toBeInTheDocument();
  });
});
