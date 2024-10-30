import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Components
import ProductForm from './index';

const meta: Meta<typeof ProductForm> = {
  title: 'Components/ProductForm',
  component: ProductForm,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof ProductForm>;

export const Default: Story = {
  args: {
    isDisabledField: false,
    onAvatarChange: fn(),
    onSubmit: fn(),
  },
};
