import type { Meta, StoryObj } from '@storybook/react';

// Components
import AddressInput from '.';

const meta: Meta<typeof AddressInput> = {
  title: 'Components/AddressInput',
  component: AddressInput,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof AddressInput>;

export const Default: Story = {
  args: {
    placeholder: 'Example placeholder',
    value: 'Example address',
  },
};
