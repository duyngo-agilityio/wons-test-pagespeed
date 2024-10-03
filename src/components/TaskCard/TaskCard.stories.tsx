// Libs
import type { Meta, StoryObj } from '@storybook/react';

// components
import { TaskCard } from '@/components';

// Mocks
import { MOCK_USERS } from '@/mocks';

const meta: Meta<typeof TaskCard> = {
  title: 'Components/TaskCard',
  component: TaskCard,
  argTypes: {
    title: {
      description:
        'The title of the task, displayed prominently at the top of the card.',
      control: { type: 'text' },
    },
    description: {
      description:
        'A brief description of the task, providing context or details about the task.',
      control: { type: 'text' },
    },
    images: {
      description:
        'An array of image URLs to display avatars or related icons. It can render one or two images depending on the number of items in the array.',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof TaskCard>;

export const Default: Story = {
  args: {
    title: 'Dashboard Design',
    description: 'Discussion for management dashboard ui design',
    images: [],
  },
};

export const OneImage: Story = {
  args: {
    title: 'Landing page Design',
    description: 'Discussion for management dashboard ui design',
    images: [MOCK_USERS[0].avatar],
  },
};
export const TwoImages: Story = {
  args: {
    title: 'Dashboard Design',
    description: 'Discussion for management dashboard ui design',
    images: [MOCK_USERS[0].avatar, MOCK_USERS[1].avatar],
  },
};
