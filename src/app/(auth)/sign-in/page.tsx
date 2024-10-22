// Actions
import { authenticate } from '@/actions';

// UI
import { SignInForm } from '@/ui';

const SignInPage = () => <SignInForm signIn={authenticate} />;

export default SignInPage;
