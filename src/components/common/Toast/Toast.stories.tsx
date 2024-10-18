import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Components
import Toast from './index';

// Constants
import { MESSAGES } from '@/constants';

const meta: Meta<typeof Toast> = {
  title: 'Components/Common/Toast',
  component: Toast,
};

export default meta;
type Story = StoryObj<typeof Toast>;

export const Default: Story = {
  args: {
    id: '1',
    title: 'Title',
    description: 'Success toast description',
    status: MESSAGES.STATUS.SUCCESS,
    onClose: fn(),
  },
};

export const Success: Story = {
  args: {
    id: '1',
    title: 'Title',
    description: 'Success toast description',
    status: MESSAGES.STATUS.SUCCESS,
    onClose: fn(),
  },
};

export const Error: Story = {
  args: {
    id: '1',
    title: 'Title',
    description: 'Error toast description',
    status: MESSAGES.STATUS.ERROR,
    onClose: fn(),
  },
};
