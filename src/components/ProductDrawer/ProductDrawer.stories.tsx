import type { Meta, StoryObj } from '@storybook/react';

// Components
import ProductDrawer from './index';

const meta: Meta<typeof ProductDrawer> = {
  title: 'Components/ProductDrawer',
  component: ProductDrawer,
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
  },
  decorators: [
    (Story) => (
      <div className="w-full h-[1000px] flex justify-center">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProductDrawer>;

export const Default: Story = {
  args: {},
};
