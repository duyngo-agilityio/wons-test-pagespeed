import type { Meta, StoryObj } from '@storybook/react';

// Constants
import { IMAGE_SRC } from '@/constants';

import ImageFallback from './index';

const meta: Meta<typeof ImageFallback> = {
  title: 'Components/Common/ImageFallback',
  component: ImageFallback,
  args: {
    width: 300,
    height: 300,
  },
  argTypes: {
    blurDataURL: {
      description: 'Helps show blurry images when loading',
      type: 'string',
    },
    fallbackSrc: {
      description: 'Helps to know when image url is broken',
      type: 'string',
    },
    alt: {
      description: 'photo information',
      type: 'string',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ImageFallback>;

export const Default: Story = {
  args: {
    src: IMAGE_SRC.DEFAULT,
    alt: 'image',
  },
};

export const Fallback: Story = {
  args: {
    src: 'error',
    alt: 'imageError',
  },
};
