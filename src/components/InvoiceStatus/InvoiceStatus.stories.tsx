// Libs
import type { Meta, StoryObj } from '@storybook/react';

// Constants
import { InvoiceStatus } from '@/constants';

// Components
import InvoiceStatusComponent from './index';

const meta: Meta<typeof InvoiceStatusComponent> = {
  title: 'Components/InvoiceStatus',
  component: InvoiceStatusComponent,
  args: {},
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof InvoiceStatusComponent>;

export const Default: Story = {
  args: {
    variant: InvoiceStatus.COMPLETE,
  },
  render: () => <InvoiceStatusComponent />,
};

export const Variants: Story = {
  render: (args) => (
    <div className="w-full flex flex-col gap-10 items-center">
      <InvoiceStatusComponent variant={InvoiceStatus.COMPLETE} {...args} />
      <InvoiceStatusComponent variant={InvoiceStatus.PENDING} {...args} />
      <InvoiceStatusComponent variant={InvoiceStatus.CANCEL} {...args} />
    </div>
  ),
};
