import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Mocks
import { MOCK_INVOICES_WITH_CUSTOMER } from '@/mocks';

// Components
import InvoicesTable from '.';

const meta: Meta<typeof InvoicesTable> = {
  title: 'Components/InvoicesTable',
  component: InvoicesTable,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof InvoicesTable>;

export const Default: Story = {
  args: {
    data: MOCK_INVOICES_WITH_CUSTOMER,
    pageCount: 1,
    isReadOnly: false,
    onEdit: fn(),
    onDelete: fn(),
    onDeleteMultiple: fn(),
    onToggleSelectStar: fn(),
    onSort: fn(),
    onRowAction: fn(),
  },
};
