// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Constants
import { FILTER_OPTIONS } from '@/constants';

// Components
import Filter from './index';

const meta: Meta<typeof Filter> = {
  title: 'Components/Common/Filter',
  component: Filter,
  args: {
    items: FILTER_OPTIONS,
  },
  argTypes: {
    items: {
      description:
        'An array of filter items, each containing an id, title, and an array of items.',
    },
    title: {
      type: 'string',
      description: 'The title of the filter button.',
    },
    buttonProps: {
      description: 'Additional props to pass to the filter button.',
    },
    popoverProps: {
      description: 'Additional props to pass to the popover container.',
    },
    popoverTriggerProps: {
      description: 'Additional props to pass to the popover trigger.',
    },
    popoverContentProps: {
      description: 'Additional props to pass to the popover content.',
    },
    listboxProps: {
      description: 'Additional props to pass to the listbox container.',
    },
    listboxItemProps: {
      description: 'Additional props to pass to each listbox item.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Filter>;

export const Default: Story = {
  args: {
    title: 'Filter',
  },
};
