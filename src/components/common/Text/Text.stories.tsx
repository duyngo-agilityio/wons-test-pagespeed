import type { Meta, StoryObj } from '@storybook/react';

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
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof Text>;

export const SuperSmallText: Story = {
  args: {
    text: 'Text content',
    size: '2xs',
    as: 'p',
    className: 'my-custom-class',
  },
};

export const SmallText: Story = {
  args: {
    text: 'Text content',
    size: 'sm',
    as: 'p',
    className: 'my-custom-class',
  },
};

export const MediumText: Story = {
  args: {
    text: 'Text content',
    size: 'md',
    as: 'p',
    className: 'my-custom-class',
  },
};

export const LargeText: Story = {
  args: {
    text: 'Text content',
    size: 'xl',
    as: 'p',
    className: 'my-custom-class',
  },
};

export const ExtraLargeText: Story = {
  args: {
    text: 'Text content',
    size: 'xxl',
    as: 'p',
    className: 'my-custom-class',
  },
};
