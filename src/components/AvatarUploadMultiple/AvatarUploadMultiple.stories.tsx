import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Components
import AvatarUploadMultiple from '.';

const meta: Meta<typeof AvatarUploadMultiple> = {
  title: 'Components/AvatarUploadMultiple',
  component: AvatarUploadMultiple,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof AvatarUploadMultiple>;

const mockPreviewFile = [
  'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
];

export const Default: Story = {
  args: {
    previewFiles: mockPreviewFile,
    onFileChange: fn(),
  },
};
