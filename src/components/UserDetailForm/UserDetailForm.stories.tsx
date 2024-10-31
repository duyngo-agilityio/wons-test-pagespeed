import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { MOCK_USER_DETAIL } from '@/mocks';

// Components
import UserDetailForm from '.';

const meta: Meta<typeof UserDetailForm> = {
  title: 'Components/UserDetailForm',
  component: UserDetailForm,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof UserDetailForm>;

export const Default: Story = {
  args: {
    user: MOCK_USER_DETAIL,
    onAvatarChange: fn(),
    onSubmit: fn(),
    onCancel: fn(),
  },
};
