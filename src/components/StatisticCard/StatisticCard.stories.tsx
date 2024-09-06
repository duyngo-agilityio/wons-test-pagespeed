// Libs
import type { Meta, StoryObj } from '@storybook/react';

// icons
import { FaHeart, FaShoppingBag, FaEnvelope } from 'react-icons/fa';
import { RiGamepadLine } from 'react-icons/ri';

// components
import StatisticCard from './index';

const meta: Meta<typeof StatisticCard> = {
  title: 'Components/Common/StatisticCard',
  component: StatisticCard,
  argTypes: {
    value: {
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
        shoppingBag: <FaShoppingBag className="h-8 w-8 text-[#FF69B4] " />,
        mail: <FaEnvelope className="h-8 w-8 text-[#3A36DB]" />,
        game: <RiGamepadLine className="h-8 w-8 text-[#03A89E]" />,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatisticCard>;

export const Interactive: Story = {
  args: {
    value: '100+',
    label: 'Favorite Services',
    icon: (
      <FaHeart
        className="h-8 w-8 text-blue-500"
        style={{ width: '21.08px', height: '20.07px' }}
      />
    ),
  },
};
