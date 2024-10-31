import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Mocks
import { MOCK_INVOICE_PRODUCT_RESPONSE } from '@/mocks';

// Components
import ProductTable from './index';

const meta: Meta<typeof ProductTable> = {
  title: 'Components/ProductTable',
  component: ProductTable,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof ProductTable>;

export const Default: Story = {
  args: {
    data: MOCK_INVOICE_PRODUCT_RESPONSE,
    onEdit: fn(),
    onDelete: fn(),
    onRowAction: fn(),
  },
};
