// Models
import { ICustomer } from '@/models';

// Types
import { TableColumnType } from '@/types';

export const PRODUCT_TABLE_COLUMNS_MOCK: TableColumnType<Partial<ICustomer>>[] =
  [
    {
      header: 'Name',
      accessor: 'name',
      isSort: true,
    },
    {
      header: 'FirstName',
      accessor: 'firstName',
      isSort: true,
    },
    {
      header: 'LastName',
      accessor: 'lastName',
      isSort: true,
    },
    {
      header: 'Email',
      accessor: 'email',
      isSort: true,
    },
  ];

export const PRODUCT_MOCK = [
  {
    id: '1',
    name: 'John Doe',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    job: 'Software Engineer',
    address: '123 Main St, City, Country',
    avatar: 'https://example.com/avatar1.jpg',
  },
  {
    id: '2',
    name: 'Jane Smith',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@example.com',
    phone: '098-765-4321',
    job: 'Project Manager',
    address: '456 Elm St, City, Country',
    avatar: 'https://example.com/avatar2.jpg',
  },
  {
    id: '3',
    name: 'Alice Johnson',
    firstName: 'Alice',
    lastName: 'Johnson',
    email: 'alice.johnson@example.com',
    phone: '555-666-7777',
    job: 'UX Designer',
    address: '789 Oak St, City, Country',
    avatar: 'https://example.com/avatar3.jpg',
  },
  {
    id: '4',
    name: 'Bob Williams',
    firstName: 'Bob',
    lastName: 'Williams',
    email: 'bob.williams@example.com',
    phone: '111-222-3333',
    job: 'Data Scientist',
    address: '101 Pine St, City, Country',
    avatar: 'https://example.com/avatar4.jpg',
  },
  {
    id: '5',
    name: 'Charlie Brown',
    firstName: 'Charlie',
    lastName: 'Brown',
    email: 'charlie.brown@example.com',
    phone: '444-555-6666',
    job: 'Marketing Specialist',
    address: '202 Birch St, City, Country',
    avatar: 'https://example.com/avatar5.jpg',
  },
];
