import type { Meta, StoryObj } from '@storybook/react';

// components
import { Button } from '@/components';

const meta: Meta<typeof Button> = {
  title: 'Components/Common/Button',
  component: Button,

  args: {
    onClick: () => alert('Active'),
  },
  argTypes: {
    color: {
      description: 'Change color button',
      options: ['default', 'primary', 'secondary'],
      control: { type: 'select' },
    },
    isDisabled: {
      description: 'Prevent button from working',
      options: [false, true],
      control: { type: 'inline-radio' },
    },
    size: {
      description: 'Change the size of the button',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Default',
  },
};

export const Primary: Story = {
  args: {
    color: 'primary',
    children: 'Primary',
  },
};

export const Secondary: Story = {
  args: {
    color: 'secondary',
    children: 'Secondary',
  },
};

export const Disable: Story = {
  args: {
    isDisabled: true,
    children: 'Disable',
  },
};

export const Loading: Story = {
  args: {
    isLoading: true,
    children: 'Loading',
  },
};

export const Sizes: Story = {
  args: {
    color: 'primary',
  },
  render: (args) => (
    <div className="w-full flex gap-10 items-center">
      <Button size="xs" {...args}>
        xs
      </Button>
      <Button size="sm" {...args}>
        sm
      </Button>
      <Button size="md" {...args}>
        md
      </Button>
      <Button size="lg" {...args}>
        lg
      </Button>
      <Button size="xl" {...args}>
        xl
      </Button>
    </div>
  ),
};
