import type { Meta } from '@storybook/react';

// Components
import DateRangePicker from './index';

const meta: Meta<typeof DateRangePicker> = {
  title: 'Components/Common/DateRangePicker',
  component: DateRangePicker,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: 'Text content',
    },
    size: {
      description: 'Size of text',
    },
    as: {
      description: 'HTML tag',
    },
    className: {
      description: 'Additional class name',
    },
  },
} satisfies Meta<typeof DateRangePicker>;

export default meta;

export const Default = () => (
  <div className="w-[320px] p-[20px] bg-gray-50 dark:bg-gray-600 rounded-2xl">
    <DateRangePicker />
  </div>
);
