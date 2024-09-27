import type { Meta, StoryObj } from '@storybook/react';

// components
import Card from './index';

const meta: Meta<typeof Card> = {
  title: 'Components/Common/Card',
  component: Card,
  argTypes: {
    rounded: {
      control: 'select',
      options: ['0px', '10px', '20px', '30px', '50%'],
    },
    bgColor: {
      control: 'select',
      options: ['pink', 'lightblue', 'lightgreen', '#ff6347', '#000'],
    },
    padding: {
      control: 'select',
      options: ['5px', '10px', '15px', '20px', '25px'],
    },
    borderColor: {
      control: 'select',
      options: ['transparent', 'black', 'red', 'blue', 'green'],
    },
    hoverEffect: {
      control: 'boolean',
    },
    header: {
      control: 'text',
      description: 'Content for the card header',
    },
    body: {
      control: 'text',
      description: 'Content for the card body',
    },
    footer: {
      control: 'text',
      description: 'Content for the card footer',
    },
    image: {
      control: 'text',
      description: 'URL for the image displayed in the card body',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    bgColor: 'pink',
    rounded: '20px',
    padding: '10px',
    borderColor: 'transparent',
    hoverEffect: true,
    header: 'Card Header: This is custom card header',
    body: 'Card Body: This is custom card body',
    footer: 'Card Footer: This is custom card footer',
    image:
      'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
  },
};
