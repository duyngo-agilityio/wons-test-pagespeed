import { Meta, StoryObj } from '@storybook/react';

// Components
import Heading from './index';

const meta: Meta<typeof Heading> = {
  title: 'Components/Common/Heading',
  component: Heading,
  argTypes: {
    children: {
      description: 'Text content',
      control: 'text',
    },
    as: {
      description: 'HTML tag',
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    className: {
      description: 'Additional class name',
      control: 'text',
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof Heading>;

export const Default: Story = {
  args: {
    children: 'This is a heading',
    as: 'h2',
  },
};
