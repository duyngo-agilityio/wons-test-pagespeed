// Models
import { ICustomer } from '@/models';

// Types
import { TableColumnType, TCustomerListResponse } from '@/types';

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

const GENDER_MALE = 'male' as const;
const GENDER_FEMALE = 'female' as const;

export const MOCK_CUSTOMERS_WITH_ATTRIBUTES = [
  {
    id: 1,
    attributes: {
      id: 1,
      firstName: 'Arrora',
      lastName: 'Gaur',
      fullName: 'Arrora Gaur',
      email: 'arroragaur@gmail.com',
      phone: '(213) 555-5554',
      gender: GENDER_MALE,
      job: 'UI/UX',
      address: '1254 Xo Viet Nghe Tinh, Da Nang',
      avatar:
        'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    },
  },
  {
    id: 2,
    attributes: {
      id: 2,
      firstName: 'Anne',
      lastName: 'Jacob',
      fullName: 'Anne Jacob',
      email: 'annejacob@gmail.com',
      phone: '(325) 987-6541',
      gender: GENDER_FEMALE,
      job: 'UI/UX',
      address: '1254 Xo Viet Nghe Tinh, Da Nang',
      avatar:
        'https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/anh-avatar-cute-4.jpg',
    },
  },
  {
    id: 3,
    attributes: {
      id: 3,
      firstName: 'John',
      lastName: 'Doe',
      fullName: 'John Doe',
      email: 'johndoe@example.com',
      phone: '(555) 123-4567',
      gender: GENDER_MALE,
      job: 'Software Engineer',
      address: '123 Main St, Anytown',
      avatar: 'https://via.placeholder.com/150',
    },
  },
  {
    id: 4,
    attributes: {
      id: 4,
      firstName: 'Jane',
      lastName: 'Smith',
      fullName: 'Jane Smith',
      email: 'janesmith@example.com',
      phone: '(555) 765-4321',
      gender: GENDER_FEMALE,
      job: 'Product Manager',
      address: '456 Elm St, Othertown',
      avatar: 'https://via.placeholder.com/150',
    },
  },
];

export const MOCK_CUSTOMER_RESPONSE: TCustomerListResponse = {
  data: MOCK_CUSTOMERS_WITH_ATTRIBUTES,
  meta: {
    pagination: {
      page: 1,
      pageSize: 10,
      pageCount: 1,
      total: 2,
    },
  },
};
