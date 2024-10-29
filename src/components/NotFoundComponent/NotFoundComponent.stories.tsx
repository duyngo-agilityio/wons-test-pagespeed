import type { Meta, StoryObj } from '@storybook/react';

// Components
import NotFoundComponent from '.';

const meta: Meta<typeof NotFoundComponent> = {
  title: 'Components/NotFoundComponent',
  component: NotFoundComponent,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof NotFoundComponent>;

export const Default: Story = {
  args: {},
};
