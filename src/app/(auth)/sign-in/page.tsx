// Constants
import { IMAGES } from '@/constants';

// Layouts
import { AuthLayout } from '@/layouts';

// Components
import { Heading, ImageFallback } from '@/components';

const SignInPage = () => (
  <AuthLayout
    image={
      <ImageFallback
        src={IMAGES.SIGN_IN_IMAGE}
        alt="sign-in"
        width={0}
        height={0}
        sizes="100vw"
        className="h-[380px] lg:h-[584px] w-auto"
      />
    }
  >
    <main className="container mx-auto">
      <Heading className="text-lg font-semibold" title="this is sign-in" />
    </main>
  </AuthLayout>
);

export default SignInPage;
