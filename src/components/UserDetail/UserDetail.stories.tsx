import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Components
import UserDetail from './index';

const meta: Meta<typeof UserDetail> = {
  title: 'Components/UserDetail',
  component: UserDetail,
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
type Story = StoryObj<typeof UserDetail>;

export const Default: Story = {
  args: {
    avatar:
      'https://www.hollywoodreporter.com/wp-content/uploads/2024/02/Avatar__The_Last_Airbender_n_S1_00_13_15_10RC.jpgAvatar__The_Last_Airbender_n_S1_00_13_15_10RC-H-2024.jpg?w=1296',
    username: 'airbender',
    role: 'user',
    fullName: 'Aang',
    email: 'aang@gmail.com',
    onButtonEditClick: fn(),
  },
};
