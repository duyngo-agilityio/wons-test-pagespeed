import type { Meta, StoryObj } from '@storybook/react';

// Components
import ThemeSwitcher from './index';

const meta: Meta<typeof ThemeSwitcher> = {
  title: 'Components/ThemeSwitcher',
  component: ThemeSwitcher,
};

export default meta;
type Story = StoryObj<typeof ThemeSwitcher>;

export const Default: Story = {
  args: {},
};
