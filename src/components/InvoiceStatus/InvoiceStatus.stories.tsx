// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Components
import InvoiceStatusComponent from './index';

// Types
import { InvoiceStatus } from '@/types';

const meta: Meta<typeof InvoiceStatusComponent> = {
  title: 'Components/InvoiceStatus',
  component: InvoiceStatusComponent,
  args: {},
  argTypes: {
    variant: {
      description: 'Variant',
      options: [
        InvoiceStatus.Complete,
        InvoiceStatus.Cancel,
        InvoiceStatus.Pending,
      ],
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof InvoiceStatusComponent>;

export const Default: Story = {
  args: {
    variant: InvoiceStatus.Complete,
  },
  render: () => <InvoiceStatusComponent />,
};

export const Variants: Story = {
  render: (args) => (
    <div className="w-full flex flex-col gap-10 items-center">
      <InvoiceStatusComponent variant={InvoiceStatus.Complete} {...args} />
      <InvoiceStatusComponent variant={InvoiceStatus.Pending} {...args} />
      <InvoiceStatusComponent variant={InvoiceStatus.Cancel} {...args} />
    </div>
  ),
};
