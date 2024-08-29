import { Meta, StoryObj } from '@storybook/react';
import Heading from '../Heading';

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
    },
    size: {
      description: 'Size of text',
    },
    as: {
      description: 'HTML tag',
    },
    className: {
      description: 'Additional class name',
    },
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof Heading>;

export const TextWithH1: Story = {
  args: {
    title: 'This text with h1 tag element',
    as: 'h1',
    size: '5xl',
    className: 'text-xxl',
  },
};

export const TextWithH2: Story = {
  args: {
    title: 'This text with h2 tag element',
    as: 'h2',
    size: '4xl',
    className: 'text-xl',
  },
};

export const TextWithH3: Story = {
  args: {
    title: 'This text with h3 tag element',
    as: 'h3',
    size: '3xl',
    className: 'text-lg',
  },
};

export const TextWithH4: Story = {
  args: {
    title: 'This text with h4 tag element',
    as: 'h4',
    size: '2xl',
  },
};

export const TextWithH5: Story = {
  args: {
    title: 'This text with h5 tag element',
    as: 'h5',
    size: 'xxl',
  },
};

export const TextWithH6: Story = {
  args: {
    title: 'This text with h6 tag element',
    as: 'h6',
    size: 'xl',
  },
};
