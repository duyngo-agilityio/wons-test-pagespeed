import type { Meta, StoryObj } from '@storybook/react';

// components
import CustomerDrawerWrapper from './index';

const meta: Meta<typeof CustomerDrawerWrapper> = {
  title: 'Components/CustomerDrawerWrapper',
  component: CustomerDrawerWrapper,
  parameters: {
    layout: 'centered',
    tags: [],
  },
};

export default meta;
type Story = StoryObj<typeof CustomerDrawerWrapper>;

export const Default: Story = {
  args: {},
};
