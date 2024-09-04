// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import Spinner from '.';

const meta: Meta<typeof Spinner> = {
  title: 'Components/Common/Spinner',
  component: Spinner,
  args: {},
  argTypes: {
    size: {
      description: 'Change the size of the spinner',
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    color: {
      description: 'The color of the spinner circles.',
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
  },
};

export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {
  args: { color: 'primary', size: 'md' },
};

export const Sizes: Story = {
  args: {
    color: 'primary',
  },
  render: (args) => (
    <div className="w-full flex gap-10 items-center">
      <Spinner size="sm" {...args}>
        sm
      </Spinner>
      <Spinner size="md" {...args}>
        md
      </Spinner>
      <Spinner size="lg" {...args}>
        lg
      </Spinner>
    </div>
  ),
};

export const Color: Story = {
  args: {
    size: 'md',
  },
  render: (args) => (
    <div className="w-full flex gap-10 items-center">
      <Spinner color="default" {...args}>
        Default
      </Spinner>
      <Spinner color="primary" {...args}>
        Primary
      </Spinner>
      <Spinner color="secondary" {...args}>
        Secondary
      </Spinner>
      <Spinner color="success" {...args}>
        Success
      </Spinner>
      <Spinner color="warning" {...args}>
        Warning
      </Spinner>
      <Spinner color="danger" {...args}>
        Danger
      </Spinner>
    </div>
  ),
};
