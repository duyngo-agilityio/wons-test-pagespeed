// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import LoadingIndicator from './index';

const meta: Meta<typeof LoadingIndicator> = {
  title: 'Components/Common/LoadingIndicator',
  component: LoadingIndicator,
  args: {},
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof LoadingIndicator>;

export const Default: Story = {
  render: () => (
    <div className="w-96 h-48">
      <LoadingIndicator />
    </div>
  ),
};
