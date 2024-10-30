import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Mocks
import { MOCK_PRODUCTS, CUSTOMER_MOCK } from '@/mocks';

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

export const Default: Story = {
  args: {
    invoiceId: '1',
    products: MOCK_PRODUCTS,
    customers: CUSTOMER_MOCK,
    isEdit: false,
    onSubmit: fn(),
  },
};
