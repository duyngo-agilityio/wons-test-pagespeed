// Libs
import { ReactNode } from 'react';

// Constants
import { IMAGES } from '@/constants';

// Layouts
import { AuthLayout } from '@/layouts';

// Components
import { Heading, ImageFallback, Logo } from '@/components';

interface SignUpLayoutProps {
  children: ReactNode;
}

const SignUpLayout = ({ children }: SignUpLayoutProps): JSX.Element => (
  <AuthLayout
    image={
      <ImageFallback
        src={IMAGES.SIGN_UP_IMAGE}
        alt="sign-up"
        width={0}
        height={0}
        sizes="100vw"
        className="h-[200px] lg:h-[427px] w-auto"
      />
    }
  >
    <div className="flex flex-col items-center pt-[47px] pb-[90px] mx-auto base:w-full xs:max-w-[348px]">
      <Logo />
      <Heading className="mt-[38px] mb-[69px]" title="Sign Up" />
      {children}
    </div>
  </AuthLayout>
);

export default SignUpLayout;
