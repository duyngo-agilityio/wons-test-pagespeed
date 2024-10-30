import type { Meta, StoryObj } from '@storybook/react';

// Components
import LevelChip from './index';

// Types
import { Level } from '@/types';

const meta: Meta<typeof LevelChip> = {
  title: 'Components/LevelChip',
  component: LevelChip,
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof LevelChip>;

export const Low: Story = {
  args: {
    level: Level.Low,
    size: 'md',
  },
};

export const Medium: Story = {
  args: {
    level: Level.Medium,
    size: 'md',
  },
};

export const High: Story = {
  args: {
    level: Level.High,
    size: 'md',
  },
};
