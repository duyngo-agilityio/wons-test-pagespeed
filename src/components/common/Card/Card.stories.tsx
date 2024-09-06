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
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    bgColor: 'pink',
    rounded: '20px',
    padding: '10px',
    children: (
      <div>
        <h3>Custom Card</h3>
        <p>Card with custom border radius, background color, and padding.</p>
      </div>
    ),
  },
};
