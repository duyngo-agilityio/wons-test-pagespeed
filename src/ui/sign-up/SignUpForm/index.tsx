'use client';

// Libs
import { Divider } from '@nextui-org/react';

// Components
import {
  Text,
  SignUpForm as SignUpFormComponent,
  Button,
  FcGoogle,
  FaFacebookF,
} from '@/components';

const SignUpForm = (): JSX.Element => {
  return (
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
      <SignUpFormComponent onSubmit={() => {}} />
    </>
  );
};

export default SignUpForm;
