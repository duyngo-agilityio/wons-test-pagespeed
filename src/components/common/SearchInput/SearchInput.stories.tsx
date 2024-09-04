import type { Meta, StoryObj } from '@storybook/react';

import { SearchInput } from '@/components';

const meta: Meta<typeof SearchInput> = {
  title: 'Components/Common/SearchInput',
  component: SearchInput,
  args: {},
  argTypes: {
    isDisabled: {
      description: 'Disable field',
      type: 'boolean',
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    className: {
      description: 'Change style as you like',
      type: 'string',
    },
    onChange: {
      description: 'Changes value of field',
      type: 'function',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};

export const HasValue: Story = {
  args: {
    defaultValue: 'John Deo',
  },
};
