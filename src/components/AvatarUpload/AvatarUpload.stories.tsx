import type { Meta, StoryObj } from '@storybook/react';
import { useForm } from 'react-hook-form';

// Components
import AvatarUpload from './index';

// models
import { ICustomer } from '@/models';

const meta: Meta<typeof AvatarUpload> = {
  title: 'Components/AvatarUpload',
  component: AvatarUpload,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof AvatarUpload>;

export const Default: Story = {
  args: {},

  render: function Render(props) {
    const { control } = useForm<ICustomer>();

    return <AvatarUpload {...props} control={control} />;
  },
};
