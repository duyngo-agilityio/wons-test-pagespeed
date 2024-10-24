// Actions
import { authenticate } from '@/actions';

// UI
import { SignInForm } from '@/ui';

export const metadata = {
  title: 'Sign In - Wons',
  description: 'login to access exclusive features on Wons.',
  openGraph: {
    title: 'Sign In - Wons',
    description: 'Create an account to access exclusive features on Wons.',
    siteName: 'Wons',
    locale: 'en_US',
    type: 'website',
  },
};

const SignInPage = () => <SignInForm signIn={authenticate} />;

export default SignInPage;
