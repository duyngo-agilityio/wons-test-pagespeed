import type { Meta, StoryObj } from '@storybook/react';

// components
import { TopSellingProducts } from '@/components';

const meta: Meta<typeof TopSellingProducts> = {
  title: 'Components/TopSellingProducts',
  component: TopSellingProducts,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof TopSellingProducts>;

export const Default: Story = {
  args: {},
};
