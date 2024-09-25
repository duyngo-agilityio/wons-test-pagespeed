// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import Checkbox from './index';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Common/Checkbox',
  component: Checkbox,
  argTypes: {
    size: {
      description: 'Change size of checkbox',
      options: ['md', 'lg'],
      control: { type: 'select' },
    },
    color: {
      description: 'Change color of checkbox',
      options: [
        'default',
        'primary',
        'secondary',
        'success',
        'warning',
        'danger',
      ],
      control: { type: 'select' },
    },
    radius: {
      description: 'Change radius of checkbox',
      options: ['none', 'sm', 'md', 'lg', 'full'],
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    color: 'primary',
    size: 'md',
    radius: 'sm',
  },
};

export const Sizes: Story = {
  args: {
    color: 'primary',
    radius: 'sm',
  },
  render: (args) => (
    <div className="w-full flex gap-10 items-center">
      <Checkbox size="md" {...args}>
        Medium
      </Checkbox>
      <Checkbox size="lg" {...args}>
        Large
      </Checkbox>
    </div>
  ),
};

export const Color: Story = {
  args: {
    size: 'md',
    radius: 'sm',
  },
  render: (args) => (
    <div className="w-full flex gap-10 items-center">
      <Checkbox color="default" isSelected {...args}>
        Default
      </Checkbox>
      <Checkbox color="primary" isSelected {...args}>
        Primary
      </Checkbox>
      <Checkbox color="secondary" isSelected {...args}>
        Secondary
      </Checkbox>
      <Checkbox color="success" isSelected {...args}>
        Success
      </Checkbox>
      <Checkbox color="warning" isSelected {...args}>
        Warning
      </Checkbox>
      <Checkbox color="danger" isSelected {...args}>
        Danger
      </Checkbox>
    </div>
  ),
};

export const Radius: Story = {
  args: {
    color: 'primary',
    size: 'lg',
  },
  render: (args) => (
    <div className="w-full flex gap-10 items-center">
      <Checkbox radius="none" isSelected {...args}>
        None
      </Checkbox>
      <Checkbox radius="sm" isSelected {...args}>
        Small
      </Checkbox>
      <Checkbox radius="md" isSelected {...args}>
        Medium
      </Checkbox>
      <Checkbox radius="lg" isSelected {...args}>
        Large
      </Checkbox>
      <Checkbox radius="full" isSelected {...args}>
        Full
      </Checkbox>
    </div>
  ),
};

export const Disable: Story = {
  args: {
    color: 'primary',
    size: 'lg',
  },
  render: (args) => (
    <Checkbox isDisabled {...args}>
      Disable
    </Checkbox>
  ),
};
