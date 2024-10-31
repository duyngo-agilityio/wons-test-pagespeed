import type { Meta, StoryObj } from '@storybook/react';

// Mocks
import { MOCK_INVOICE_PRODUCT_RESPONSE } from '@/mocks';

// Components
import RecentServicesTable from './index';

const meta: Meta<typeof RecentServicesTable> = {
  title: 'Components/RecentServicesTable',
  component: RecentServicesTable,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof RecentServicesTable>;

export const Default: Story = {
  args: {
    data: MOCK_INVOICE_PRODUCT_RESPONSE,
    order: '',
  },
};
