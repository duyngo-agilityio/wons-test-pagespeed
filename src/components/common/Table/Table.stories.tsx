import type { Meta } from '@storybook/react';

// Components
import Table, { TableColumnType } from './index';

interface Customer {
  idOrder: string;
  customer: string;
  product: string;
  status: string;
  email: string;
  name: string;
}

const meta: Meta<typeof Table> = {
  component: Table,
};

export default meta;

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
  {
    header: 'Email',
    accessor: 'email',
  },
  {
    header: 'Name',
    accessor: 'name',
  },
];

const data = [
  {
    id: '1',
    idOrder: '345-645',
    customer: 'Iphone 11 256',
    product: 'Surabaya',
    status: 'Rejected',
    email: 'admin@gmail.com',
    name: 'admin',
  },
  {
    id: '2',
    idOrder: '465-674',
    customer: 'Gaming Chair Dra',
    product: 'Surabaya',
    status: 'Complete',
    email: 'admin@gmail.com',
    name: 'admin',
  },
  {
    id: '3',
    idOrder: '465-674',
    customer: 'Gaming Chair Dr',
    product: 'Surabaya',
    status: 'Complete',
    email: 'admin@gmail.com',
    name: 'admin',
  },
  {
    id: '4',
    idOrder: '465-674',
    customer: 'Gaming Chair Dragon War',
    product: 'Surabaya',
    status: 'Complete',
    email: 'admin@gmail.com',
    name: 'admin',
  },
];

export const Primary = () => (
  <Table columns={columnsTable} data={data} variant="primary" />
);

export const Secondary = () => (
  <div className="bg-[white] p-[20px] rounded-2xl">
    <Table columns={columnsTable} data={data} variant="secondary" isStriped />
  </div>
);
