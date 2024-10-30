import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Mocks
import { MOCK_PRODUCTS } from '@/mocks';

// Components
import InvoiceProductTable from './index';

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

export const Default: Story = {
  args: {
    setErrorProducts: fn(),
    setProductsValues: fn(),
    products: MOCK_PRODUCTS,
    errorProducts: '',
    productsValues: [],
  },
};
