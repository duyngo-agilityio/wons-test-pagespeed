import type { Meta, StoryObj } from '@storybook/react';

// Components
import GenderStatus from '.';

const meta: Meta<typeof GenderStatus> = {
  title: 'Components/GenderStatus',
  component: GenderStatus,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof GenderStatus>;

export const Male: Story = {
  args: {
    gender: 'male',
  },
};

export const Female: Story = {
  args: {
    gender: 'female',
  },
};
