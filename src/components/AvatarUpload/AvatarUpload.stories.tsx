import type { Meta, StoryObj } from '@storybook/react';

// Components
import AvatarUpload from './index';

const meta: Meta<typeof AvatarUpload> = {
  title: 'Components/AvatarUpload',
  component: AvatarUpload,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof AvatarUpload>;

export const Default: Story = {
  args: {},

  render: function Render(props) {
    return <AvatarUpload {...props} />;
  },
};
