import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Components
import CustomerForm from './index';

const meta: Meta<typeof CustomerForm> = {
  title: 'Components/CustomerForm',
  component: CustomerForm,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof CustomerForm>;

export const Default: Story = {
  args: {
    onSubmit: fn(),
    setReset: fn(),
  },
};
