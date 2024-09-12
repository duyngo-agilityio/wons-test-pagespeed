import type { Meta } from '@storybook/react';
import { fn } from '@storybook/test';

// Components
import SignInForm from './index';

const meta: Meta<typeof SignInForm> = {
  title: 'Components/SignInForm',
  component: SignInForm,
};

export default meta;

export const Default = () => (
  <div className="bg-white dark:bg-gray-400 w-[600px] p-[20px] rounded-2xl">
    <SignInForm onSubmit={fn()} />
  </div>
);
