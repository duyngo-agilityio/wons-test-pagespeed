import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Components
import StarButton from './index';

const meta: Meta<typeof StarButton> = {
  title: 'Components/StarButton',
  component: StarButton,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof StarButton>;

export const Default: Story = {
  args: {
    id: 1,
    isSelected: false,
    onClick: fn(),
  },
};

export const Selected: Story = {
  args: {
    id: 1,
    isSelected: true,
    onClick: fn(),
  },
};
