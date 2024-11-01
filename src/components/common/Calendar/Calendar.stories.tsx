import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// Libraries
import { getLocalTimeZone, today } from '@internationalized/date';

// Components
import CalendarCustom from './index';

const meta: Meta<typeof CalendarCustom> = {
  title: 'Components/Common/Calendar',
  component: CalendarCustom,
};

export default meta;
type Story = StoryObj<typeof CalendarCustom>;

const todayDate = today(getLocalTimeZone());

export const Default: Story = {
  args: {
    value: todayDate,
    onDateSelect: fn(),
  },
};
