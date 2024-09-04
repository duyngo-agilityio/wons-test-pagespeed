import type { Preview } from '@storybook/react';

import '../src/styles/global.css';

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    nextjs: {
      appDirectory: true,
      router: {
        basePath: '/',
      },
    },
  },
};

export default preview;
