import { Meta, StoryObj } from '@storybook/react';

// components
import Heading from './index';

const meta: Meta<typeof Heading> = {
  title: 'Components/Common/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'Text content',
      control: 'text',
    },
    size: {
      description: 'Size of text',
      control: { type: 'select' },
      options: ['5xl', '4xl', '3xl', '2xl'],
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

export const HeadingStory: Story = {
  args: {
    title: 'This is a heading',
    as: 'h1',
    size: '5xl',
    className: '',
  },
};
