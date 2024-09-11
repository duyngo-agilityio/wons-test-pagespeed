// Libs
import type { Meta, StoryObj } from '@storybook/react';

// components
import StatisticSection from './index';

const meta: Meta<typeof StatisticSection> = {
  title: 'Components/StatisticSection',
  component: StatisticSection,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof StatisticSection>;

export const Interactive: Story = {
  args: {},
};
