import { Meta, StoryObj } from '@storybook/react';

// Components
import Heading from './index';

const meta: Meta<typeof Heading> = {
  title: 'Components/Common/Heading',
  component: Heading,
  argTypes: {
    title: {
      description: 'Text content',
      control: 'text',
    },
    as: {
      description: 'HTML tag',
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
    },
    size: {
      description: 'Size of heading',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
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
    title: 'This is a heading',
    as: 'h2',
    size: 'lg',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="w-full flex flex-col gap-10 items-center">
      <Heading size="lg" as="h1" title="(lg) This is a heading" />
      <Heading size="md" as="h2" title="(md) This is a heading" />
      <Heading size="sm" as="h3" title="(sm) This is a heading" />
    </div>
  ),
};
