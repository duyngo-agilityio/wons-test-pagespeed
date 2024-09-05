// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import LoadingIndicator from './index';

const meta: Meta<typeof LoadingIndicator> = {
  title: 'Components/Common/LoadingIndicator',
  component: LoadingIndicator,
  args: {},
  argTypes: {
    size: {
      description: 'Change the size of the loading indicator',
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof LoadingIndicator>;

export const Default: Story = {
  args: { size: 'lg' },
  render: () => (
    <div className="w-96 h-48">
      <LoadingIndicator />
    </div>
  ),
};

export const Small: Story = {
  args: { size: 'sm' },
  render: () => (
    <div className="w-96 h-48">
      <LoadingIndicator size="sm" />
    </div>
  ),
};

export const Medium: Story = {
  args: { size: 'md' },
  render: () => (
    <div className="w-96 h-48">
      <LoadingIndicator size="md" />
    </div>
  ),
};

export const Large: Story = {
  args: { size: 'lg' },
  render: () => (
    <div className="w-96 h-48">
      <LoadingIndicator size="lg" />
    </div>
  ),
};
