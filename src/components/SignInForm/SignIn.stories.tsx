import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Components
import SignInForm from './index';

const meta: Meta<typeof SignInForm> = {
  component: SignInForm,
};

export default meta;
type Story = StoryObj<typeof SignInForm>;

export const Default: Story = {
  args: {
    onSubmit: fn(),
  },
};
