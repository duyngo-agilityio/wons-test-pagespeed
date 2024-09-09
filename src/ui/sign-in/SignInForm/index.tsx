'use client';

// Libs
import { Divider } from '@nextui-org/react';
import Link from 'next/link';

// Types
import { SignInFormData } from '@/types';

// Components
import {
  Text,
  SignInForm as SignInFormComponent,
  Button,
  FcGoogle,
  FaFacebookF,
} from '@/components';

interface SignFormProps {
  signIn: (formData: SignInFormData) => Promise<void | string>;
}

const SignInForm = ({ signIn }: SignFormProps): JSX.Element => (
  <>
    <div className="w-full flex justify-between gap-[22px]">
      <Button
        startContent={<FcGoogle className="w-[18px] h-[18px]" />}
        className="w-[164px] h-12.5"
      >
        Google
      </Button>
      <Button
        startContent={
          <FaFacebookF className="w-2.25 h-[18px] text-[#385C8E]" />
        }
        className="w-[164px] h-12.5"
      >
        Facebook
      </Button>
    </div>
    <div className="flex items-center w-full mt-6.25 mb-[31px]">
      <Divider className="flex-1 bg-blue-800/10 dark:bg-white/10" />
      <Text text="Or" size="xl" className=" font-medium px-2.5" />
      <Divider className="flex-1 bg-blue-800/10 dark:bg-white/10" />
    </div>
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
