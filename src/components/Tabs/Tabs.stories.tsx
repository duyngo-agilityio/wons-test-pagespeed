import type { Meta, StoryObj } from '@storybook/react';

// Mocks
import { EVENT_TABS } from '@/mocks';

// components
import Tabs from './index';

// Get key of tabs
const keys = EVENT_TABS.map(({ key }) => key);

const meta: Meta<typeof Tabs> = {
  title: 'Components/Common/CustomTabs',
  component: Tabs,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  argTypes: {
    isDisabled: {
      description: 'Avoid change content of tab',
      options: [true, false],
      control: { type: 'inline-radio' },
    },
    disabledKeys: {
      description: 'Disable key to do not change content of that key',
      options: keys,
      control: { type: 'inline-check' },
    },
    placement: {
      description: 'Display position of tabs',
      options: ['top', 'right', 'bottom', 'left'],
      control: { type: 'inline-radio' },
    },
    tabs: {
      description: 'Array of tabs with dynamic key, label, and content',
    },
  },
  args: {
    isDisabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    tabs: EVENT_TABS,
  },
};
