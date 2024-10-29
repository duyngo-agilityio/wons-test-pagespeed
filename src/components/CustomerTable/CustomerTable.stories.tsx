import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Mocks
import { MOCK_CUSTOMERS_WITH_ATTRIBUTES } from '@/mocks';

// Components
import CustomerTable from '.';

const meta: Meta<typeof CustomerTable> = {
  title: 'Components/CustomerTable',
  component: CustomerTable,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof CustomerTable>;

export const Default: Story = {
  args: {
    data: MOCK_CUSTOMERS_WITH_ATTRIBUTES,
    isReadOnly: false,
    pageCount: 1,
    onEdit: fn(),
    onSort: fn(),
    onDelete: fn(),
  },
};
