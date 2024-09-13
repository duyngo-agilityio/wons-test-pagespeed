import type { Meta, StoryObj } from '@storybook/react';

// Components
import { CustomerDrawer } from '@/components';

const meta: Meta<typeof CustomerDrawer> = {
  title: 'Components/CustomerDrawer',
  component: CustomerDrawer,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof CustomerDrawer>;

export const Default: Story = {
  args: {},
};
