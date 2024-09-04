// Components
import Table, { TableColumnType } from '../index';

interface Customer {
  idOrder: string;
  customer: string;
  product: string;
  status: string;
}

const columnsTable: TableColumnType<Partial<Customer>>[] = [
  {
    header: 'Id Order',
    accessor: 'idOrder',
    isSort: true,
  },
  {
    header: 'Product',
    accessor: 'product',
    isSort: true,
  },
  {
    header: 'Customer',
    accessor: 'customer',
    isSort: true,
  },
  {
    header: 'Status',
    accessor: 'status',
  },
];

const data = [
  {
    id: '1',
    idOrder: '345-645',
    customer: 'Iphone 11 256',
    product: 'Surabaya',
    status: 'Rejected',
  },
  {
    id: '2',
    idOrder: '465-674',
    customer: 'Gaming Chair Dra',
    product: 'Surabaya',
    status: 'Complete',
  },
];

describe('Table', () => {
  it('should match snapshot for Table primary', () => {
    const { container } = testLibJestUtils.render(
      <Table columns={columnsTable} data={data} />,
    );

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for Table secondary', () => {
    const { container } = testLibJestUtils.render(
      <Table
        columns={columnsTable}
        data={data}
        variant="secondary"
        isStriped
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
