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
    text: {
      description: 'Text content',
      control: 'text',
    },
    as: {
      description: 'HTML tag',
      control: { type: 'select' },
      options: ['p', 'span', 'div'],
    },
    size: {
      description: 'Size of text',
      control: { type: 'select' },
      options: [
        '4xs',
        '3xs',
        '2xs',
        'xs',
        'sm',
        'md',
        'lg',
        'xl',
        'xxl',
        '2xl',
        '3xl',
        '4xl',
      ],
    },
    className: {
      description: 'Additional class name',
      control: 'text',
    },
  },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    text: 'In love with React & Next',
    size: 'md',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="w-full flex flex-col gap-10 items-center">
      <Text size="4xl" text="(4xl) In love with React & Next" />
      <Text size="3xl" text="(3xl) In love with React & Next" />
      <Text size="2xl" text="(2xl) In love with React & Next" />
      <Text size="xxl" text="(xxl) In love with React & Next" />
      <Text size="xl" text="(xl) In love with React & Next" />
      <Text size="lg" text="(lg) In love with React & Next" />
      <Text size="md" text="(md) In love with React & Next" />
      <Text size="sm" text="(sm) In love with React & Next" />
      <Text size="xs" text="(xs) In love with React & Next" />
      <Text size="2xs" text="(2xs) In love with React & Next" />
      <Text size="3xs" text="(3xs) In love with React & Next" />
      <Text size="4xs" text="(4xs) In love with React & Next" />
    </div>
  ),
};
