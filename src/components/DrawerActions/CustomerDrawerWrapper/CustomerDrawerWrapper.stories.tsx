import type { Meta, StoryObj } from '@storybook/react';

// components
import CustomerDrawerWrapper from './index';

const meta: Meta<typeof CustomerDrawerWrapper> = {
  title: 'Components/CustomerDrawerWrapper',
  component: CustomerDrawerWrapper,
  parameters: {
    layout: 'fullscreen',
    tags: [],
  },
  decorators: [
    (Story) => (
      <div style={{ margin: 0, padding: 0, height: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CustomerDrawerWrapper>;

export const Default: Story = {
  args: {},
};
