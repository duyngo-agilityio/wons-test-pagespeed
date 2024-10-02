import type { Meta, StoryObj } from '@storybook/react';

// components
import AvatarGroup from './index';

// mocks
import { MOCK_USERS } from '@/mocks';

const meta: Meta<typeof AvatarGroup> = {
  title: 'Components/AvatarGroup',
  component: AvatarGroup,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof AvatarGroup>;

export const Default: Story = {
  args: {
    users: MOCK_USERS,
  },
};
