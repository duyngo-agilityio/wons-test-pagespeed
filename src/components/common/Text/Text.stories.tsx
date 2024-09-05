import type { Meta, StoryObj } from '@storybook/react';

// components
import Text from './index';

const meta: Meta<typeof Text> = {
  title: 'Components/Common/Text',
  component: Text,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      description: 'HTML tag',
      control: { type: 'select' },
      options: ['p', 'span', 'div'],
    },
    className: {
      description: 'Additional class name',
      control: 'text',
    },
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof Text>;

export const TextStory: Story = {
  args: {
    className: 'text-[30px]',
    children:
      ' Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur',
  },
};
