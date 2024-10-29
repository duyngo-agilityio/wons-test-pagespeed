import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Components
import InvoiceProductTable from '.';

const meta: Meta<typeof InvoiceProductTable> = {
  title: 'Components/InvoiceProductTable',
  component: InvoiceProductTable,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof InvoiceProductTable>;

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

export const Default: Story = {
  args: {
    setErrorProducts: fn(),
    setProductsValues: fn(),
    products: mockProducts,
    errorProducts: undefined,
    productsValues: undefined,
  },
};
