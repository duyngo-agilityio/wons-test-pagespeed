import type { Meta, StoryObj } from '@storybook/react';

// components
import Card from './index';

const meta: Meta<typeof Card> = {
  title: 'Components/Common/Calendar',
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {},
};
