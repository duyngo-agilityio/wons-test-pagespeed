import type { Meta, StoryObj } from '@storybook/react';

// Components
import Logo from './index';

const meta: Meta<typeof Logo> = {
  title: 'Components/Logo',
  component: Logo,
  argTypes: {
    size: {
      description: 'Change the size of the logo',
      options: ['sm', 'lg'],
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Default: Story = {
  args: {
    size: 'lg',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};
