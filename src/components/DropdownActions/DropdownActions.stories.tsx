import type { Meta, StoryObj } from '@storybook/react';

// components
import Dropdown from './index';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  argTypes: {
    onEdit: {
      action: 'onEdit',
    },
    onDelete: {
      action: 'onDelete',
    },
    id: {
      control: {
        type: 'text',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  args: {
    onEdit: () => {},
    onDelete: () => {},
    id: 'test-id',
  },
};
