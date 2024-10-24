import { SignUpForm } from '@/ui';

export const metadata = {
  title: 'Sign Up - Wons',
  description: 'Create an account to access exclusive features on Wons.',
  openGraph: {
    title: 'Sign Up - Wons',
    description: 'Create an account to access exclusive features on Wons.',
    siteName: 'Wons',
    locale: 'en_US',
    type: 'website',
  },
};

const SignUpPage = () => <SignUpForm />;

export default SignUpPage;
