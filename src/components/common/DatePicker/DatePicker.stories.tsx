// Libs
import type { Meta, StoryObj } from '@storybook/react';
import { parseAbsoluteToLocal } from '@internationalized/date';

// Components
import DatePicker from '.';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/Common/DatePicker',
  component: DatePicker,
  args: {},
  argTypes: {
    label: {
      description: 'The content to display as the label.',
      type: 'string',
    },
    defaultValue: {
      label: 'The default value of the date-picker ',
      type: 'string',
    },
    isInvalid: {
      description: 'Whether the date-picker is invalid.',
      type: 'boolean',
    },
    errorMessage: {
      description: 'An error message for the date input.',
      type: 'string',
    },
    granularity: {
      description:
        'Determines the smallest unit that is displayed in the date picker. Typically "day" for dates.',
      type: 'string',
      options: ['day', 'hour', 'minute', 'second'],
      control: { type: 'select' },
    },
    className: {
      description: 'Change style as you like',
      type: 'string',
    },
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  args: {
    className: 'w-[300px]',
  },
};

export const HasValue: Story = {
  args: {
    label: 'Date',
    defaultValue: parseAbsoluteToLocal('2024-09-07T18:45:22Z'),
    granularity: 'day',
    className: 'w-[300px]',
  },
};

export const HasError: Story = {
  args: {
    label: 'Date',
    defaultValue: parseAbsoluteToLocal('2024-09-07T18:45:22Z'),
    granularity: 'day',
    isInvalid: true,
    errorMessage: 'Value must be 9/3/2024 or later.',
    className: 'w-[300px]',
  },
};
