import type { Meta, StoryObj } from '@storybook/react';

// Components
import Input from './index';

const meta: Meta<typeof Input> = {
  title: 'Components/Common/Input',
  component: Input,
  args: {
    placeholder: 'Enter text...',
  },
  argTypes: {
    color: {
      description: 'Change the color of the input',
      options: ['primary', 'secondary'],
      control: { type: 'select' },
    },
    size: {
      description: 'Change the size of the input',
      options: ['sm', 'md'],
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
    radius: {
      description: 'Set the border radius of the input',
      options: ['none', 'sm', 'md'],
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    color: 'primary',
    size: 'md',
    disabled: false,
    radius: 'md',
    label: 'Email',
  },
};

export const HasError: Story = {
  args: {
    color: 'primary',
    size: 'md',
    disabled: false,
    radius: 'md',
    label: 'Email',
    isInvalid: true,
    errorMessage: 'Please enter your email.',
  },
};

export const Colors: Story = {
  args: {
    size: 'md',
  },
  render: (args) => (
    <div className="w-full flex gap-10 items-center">
      <Input color="primary" {...args}>
        Primary
      </Input>
      <Input color="secondary" {...args}>
        Secondary
      </Input>
    </div>
  ),
};

export const Sizes: Story = {
  args: {
    color: 'primary',
  },
  render: (args) => (
    <div className="w-full flex gap-10 items-center">
      <Input size="sm" {...args}>
        Small
      </Input>
      <Input size="md" {...args}>
        Medium
      </Input>
    </div>
  ),
};

export const Radius: Story = {
  args: {
    color: 'primary',
    size: 'md',
  },
  render: (args) => (
    <div className="w-full flex gap-10 items-center">
      <Input radius="none" {...args}>
        None
      </Input>
      <Input radius="sm" {...args}>
        Small
      </Input>
      <Input radius="md" {...args}>
        Medium
      </Input>
    </div>
  ),
};
