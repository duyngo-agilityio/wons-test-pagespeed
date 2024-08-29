import type { Meta, StoryObj } from '@storybook/react';

// components
import Input from './index';

const meta: Meta<typeof Input> = {
  title: 'Components/Common/Input',
  component: Input,
  parameters: {
    controls: { expanded: true },
  },

  args: {
    placeholder: 'Enter text...',
  },

  argTypes: {
    color: {
      description: 'Change the color of the input',
      options: ['default', 'primary', 'secondary'],
      control: { type: 'select' },
    },
    size: {
      description: 'Change the size of the input',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
    placeholder: {
      description: 'Input placeholder text',
      control: { type: 'text' },
    },
    disabled: {
      description: 'Disable the input field',
      control: { type: 'boolean' },
    },
    required: {
      description: 'Set the input field as required',
      control: { type: 'boolean' },
    },
    radius: {
      description: 'Set the border radius of the input',
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      control: { type: 'select' },
    },
    border: {
      description: 'Set the border style of the input',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {},
};
