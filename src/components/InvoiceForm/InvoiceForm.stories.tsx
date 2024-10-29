import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Components
import InvoiceForm from '.';

const meta: Meta<typeof InvoiceForm> = {
  title: 'Components/InvoiceForm',
  component: InvoiceForm,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof InvoiceForm>;

const mockProducts = [
  {
    brand: 'Apple',
    createdAt: '2024-08-27T04:20:56.562Z',
    description:
      'This the New creation Of apple  This the New creation Of apple This the New creation Of apple This the New creation Of apple.',
    id: 1,
    imageUrl:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
    negotiable: true,
    price: 1000,
    publishedAt: '2024-09-10T04:14:24.732Z',
    rating: 4,
    title: 'I phone 12',
    updatedAt: '2024-09-23T02:52:07.552Z',
  },
];

const mockCustomers = [
  {
    address: 'danang',
    avatar:
      'https://cellphones.com.vn/sforum/wp-content/uploads/2024/02/anh-avatar-cute-2.jpg',
    createdAt: '2024-08-27T04:26:10.184Z',
    email: 'robertbacins@gmail.com',
    firstName: 'Robert ',
    fullName: 'Robert Bacins',
    gender: 'male',
    id: 2,
    job: 'UI UX',
    lastName: 'Bacins',
    phone: '24234234324',
    publishedAt: '2024-09-10T04:15:21.604Z',
    updatedAt: '2024-09-16T02:15:38.465Z',
  },
];

export const Default: Story = {
  args: {
    invoiceId: '1',
    products: mockProducts,
    customers: mockCustomers,
    isEdit: false,
    onSubmit: fn(),
  },
};
