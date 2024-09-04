import { TableColumnType } from '@/types';

interface Product {
  idOrder: string;
  customer: string;
  product: string;
  status: string;
  email: string;
  name: string;
}

export const columnsProductsTable: TableColumnType<Partial<Product>>[] = [
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

export const productMock = [
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
