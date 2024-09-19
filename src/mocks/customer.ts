// Models
import { ICustomer } from '@/models';

// Types
import { TableColumnType } from '@/types';

export const PRODUCT_TABLE_COLUMNS_MOCK: TableColumnType<Partial<ICustomer>>[] =
  [
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

export const CUSTOMER_MOCK: ICustomer[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    gender: 'male',
    job: 'Software Engineer',
    address: '123 Main St, Anytown, USA',
    avatar:
      'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
  },
  {
    id: 2,
    firstName: 'Jane',
    lastName: 'Smith',
    fullName: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '987-654-3210',
    gender: 'female',
    job: 'Product Manager',
    address: '456 Market St, Anytown, USA',
    avatar:
      'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
  },
  {
    id: 3,
    firstName: 'Emily',
    lastName: 'Johnson',
    fullName: 'Emily Johnson',
    email: 'emily.johnson@example.com',
    phone: '555-123-4567',
    gender: 'female',
    job: 'Designer',
    address: '789 Broadway St, Anytown, USA',
    avatar:
      'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
  },
];
