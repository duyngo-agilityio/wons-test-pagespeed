import type { Meta, StoryObj } from '@storybook/react';

// components
import { ProductCard } from '@/components';

const meta: Meta<typeof ProductCard> = {
  title: 'Components/ProductCard',
  component: ProductCard,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  argTypes: {
    url: {
      description: 'The image URL of the product.',
      control: { type: 'text' },
      defaultValue: 'https://example.com/shoe.png',
    },
    title: {
      description: 'The title of the product.',
      control: { type: 'text' },
      defaultValue: 'Web Development',
    },
    price: {
      description: 'The price of the product.',
      control: { type: 'number' },
      defaultValue: 87,
    },
    rating: {
      description: 'The rating of the product (out of 5).',
      control: { type: 'number', min: 0, max: 5 },
      defaultValue: 4,
    },

    alt: {
      description: 'The alternative text for the image.',
      control: { type: 'text' },
      defaultValue: 'Shoe image',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProductCard>;

export const Default: Story = {
  args: {
    url: 'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
    alt: 'Shoe image',
    title: 'Web Development',
    price: 87,
    rating: 4,
  },
};
