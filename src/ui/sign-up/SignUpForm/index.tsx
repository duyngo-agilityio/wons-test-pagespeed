'use client';

// Libs
import { Divider } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

// Actions
import { signUp } from '@/actions';

// Hooks
import { useToast } from '@/hooks';

// Types
import { TSignUpPayload } from '@/types';

// Components
import {
  Text,
  SignUpForm as SignUpFormComponent,
  Button,
  FcGoogle,
  FaFacebookF,
} from '@/components';
import { ERROR_MESSAGES, MESSAGE_STATUS, ROUTES } from '@/constants';

const SignUpForm = (): JSX.Element => {
  const [isPending, setIsPending] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  const handleSignUp = useCallback(
    async (formData: TSignUpPayload) => {
      setIsPending(true);

      // Call API to create a new account
      const signUpRes = await signUp(formData);

      const { error: signUpError } = signUpRes || {};

      if (signUpError) {
        setIsPending(false);

        return showToast({
          title: '',
          description: ERROR_MESSAGES.EMAIL_EXIST,
          status: MESSAGE_STATUS.ERROR,
        });
      }

      // After sign up successfully, navigate to Account Success
      return router.push(ROUTES.ACCOUNT_SUCCESS);
    },
    [router, showToast],
  );

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
      <SignUpFormComponent isPending={isPending} onSubmit={handleSignUp} />
    </>
  );
};

export default SignUpForm;
