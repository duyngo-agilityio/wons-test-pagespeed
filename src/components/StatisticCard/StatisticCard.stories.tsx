// Libs
import type { Meta, StoryObj } from '@storybook/react';

// icons
import { FaHeart, FaShoppingBag, FaEnvelope } from 'react-icons/fa';
import { RiGamepadLine } from 'react-icons/ri';

// components
import { StatisticCard } from '@/components';

const meta: Meta<typeof StatisticCard> = {
  title: 'Components/StatisticCard',
  component: StatisticCard,
  argTypes: {
    statistic: {
      description: 'The numeric value displayed on the card.',
      control: { type: 'select' },
      options: ['50+', '100+', '150+', '200+'],
    },
    label: {
      description: 'The label that describes the statistic.',
      control: { type: 'text' },
    },
    icon: {
      description: 'The icon to be displayed in the card.',
      control: { type: 'radio' },
      options: ['heart', 'shoppingBag', 'mail', 'game'],
      mapping: {
        heart: <FaHeart className="h-8 w-8 text-[#3A36DB]" />,
        shoppingBag: <FaShoppingBag className="h-8 w-8 text-[#FF69B4]" />,
        mail: <FaEnvelope className="h-8 w-8 text-[#3A36DB]" />,
        game: <RiGamepadLine className="h-8 w-8 text-[#03A89E]" />,
      },
    },
    lightBgColor: {
      description: 'The background color for the icon container in light mode.',
      control: { type: 'select' },
      options: ['bg-blue-400', 'bg-pink-400', 'bg-gray-200', 'bg-yellow-300'],
    },
    darkBgColor: {
      description: 'The background color for the icon container in dark mode.',
      control: { type: 'select' },
      options: [
        'dark:bg-blue-600',
        'dark:bg-pink-600',
        'dark:bg-gray-700',
        'dark:bg-yellow-500',
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatisticCard>;

export const Interactive: Story = {
  args: {
    statistic: '100+',
    label: 'Favorite Services',
    icon: 'heart',
    lightBgColor: 'bg-blue-400',
    darkBgColor: 'dark:bg-blue-600',
  },
};
