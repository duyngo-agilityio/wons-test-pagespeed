import type { Meta, StoryObj } from '@storybook/react';

// themes
import { colors } from '@/themes';

// components
import Checkbox from './index';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Common/Checkbox',
  component: Checkbox,
  argTypes: {
    color: {
      description: 'Select color of the checkbox',
      options: ['default', 'custom'],
      control: { type: 'radio' },
    },
    afterBgColor: {
      description: 'Background color for checkbox after state',
      control: { type: 'select' },
      options: [colors.blue[500], colors.pink[500], colors.purple[600]],
    },
    size: {
      description: 'Change size of checkbox',
      options: ['md', 'lg'],
      control: { type: 'radio' },
    },
    radius: {
      description: 'Change radius of checkbox',
      options: ['sm', 'md', 'lg'],
      control: { type: 'radio' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    color: 'default',
    size: 'md',
    radius: 'sm',
    afterBgColor: '#1E90FF',
  },
};
