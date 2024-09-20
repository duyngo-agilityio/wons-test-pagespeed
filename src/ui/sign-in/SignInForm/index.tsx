'use client';

// Libs
import Link from 'next/link';

// Types
import { SignInFormData } from '@/types';

// Components
import { Text, SignInForm as SignInFormComponent } from '@/components';

interface SignFormProps {
  signIn: (formData: SignInFormData) => Promise<void | string>;
}

const SignInForm = ({ signIn }: SignFormProps): JSX.Element => (
  <>
    <SignInFormComponent onSubmit={signIn} />
    <div className="flex justify-center items-center mt-7.5">
      <Text
        text="Don’t have account yet?"
        size="xl"
        className="color-blue-900 font-medium inline"
      />
      &nbsp;
      <Link href="/sign-up">
        <Text
          text="New Account"
          size="xl"
          className="!text-blue-500 dark:!text-purple-600 font-medium inline hover:underline"
        />
      </Link>
    </div>
  </>
);

export default SignInForm;
