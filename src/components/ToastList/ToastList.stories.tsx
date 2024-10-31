import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Mocks
import { MOCK_ERROR_TOASTS, MOCK_SUCCESS_TOASTS } from '@/mocks';

// Components
import ToastList from './index';

const meta: Meta<typeof ToastList> = {
  title: 'Components/ToastList',
  component: ToastList,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  decorators: [
    (Story) => (
      <div className="h-[150px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ToastList>;

export const Successful: Story = {
  args: {
    toasts: MOCK_SUCCESS_TOASTS,
    onClose: fn(),
  },
};

export const UnSuccessful: Story = {
  args: {
    toasts: MOCK_ERROR_TOASTS,
    onClose: fn(),
  },
};
