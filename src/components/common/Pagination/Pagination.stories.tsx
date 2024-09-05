import { Meta, StoryObj } from '@storybook/react';

// components
import Pagination from './index';

const meta: Meta<typeof Pagination> = {
  title: 'Components/common/Pagination',
  component: Pagination,
  argTypes: {
    total: {
      description: 'Total number of pages',
    },
  },
  args: {
    total: 10,
  },
  parameters: {
    controls: {
      expanded: true,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Primary: Story = {};
