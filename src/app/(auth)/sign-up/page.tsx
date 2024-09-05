// Constants
import { IMAGE_URL } from '@/constants';

// Layouts
import { AuthLayout } from '@/layouts';

// Components
import { Heading, ImageFallback } from '@/components';

const Homepage = () => {
  return (
    <AuthLayout
      image={
        <ImageFallback
          src={IMAGE_URL.SIGN_UP_IMAGE}
          alt="sign-up"
          width={0}
          height={0}
          sizes="100vw"
          className="h-[230px] lg:h-[427px]"
          style={{
            width: 'auto',
          }}
        />
      }
    >
      <main className="container mx-auto">
        <Heading className="text-lg font-semibold" title="this is sign-up" />
      </main>
    </AuthLayout>
  );
};

export default Homepage;
