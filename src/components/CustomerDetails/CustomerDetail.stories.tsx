import type { Meta, StoryObj } from '@storybook/react';

// Mocks
import { CUSTOMER_MOCK } from '@/mocks';

// Components
import CustomerDetails from '.';

const meta: Meta<typeof CustomerDetails> = {
  title: 'Components/CustomerDetails',
  component: CustomerDetails,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof CustomerDetails>;

export const Default: Story = {
  args: {
    customer: CUSTOMER_MOCK[0],
    isLoading: false,
  },
};
