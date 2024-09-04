import type { Meta, StoryObj } from '@storybook/react';

import ArrowDownIcon from '../ArrowDownIcon';

const meta: Meta<typeof ArrowDownIcon> = {
  title: 'Icons/ArrowDownIcon',
  component: ArrowDownIcon,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ArrowDownIcon>;

export default meta;
type Story = StoryObj<typeof ArrowDownIcon>;

export const Default: Story = {
  args: {},
};
