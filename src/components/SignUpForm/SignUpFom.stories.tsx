import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Components
import SignUpForm from './index';

const meta: Meta<typeof SignUpForm> = {
  title: 'Components/SignUpForm',
  component: SignUpForm,
};

export default meta;
type Story = StoryObj<typeof SignUpForm>;

export const Default: Story = {
  args: {
    onSubmit: fn(),
  },
};
