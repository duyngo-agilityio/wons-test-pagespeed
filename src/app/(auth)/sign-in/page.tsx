// Actions
import { authenticate } from '@/actions';

// UI
import { SignInForm } from '@/ui';

const SignUpPage = () => <SignInForm signIn={authenticate} />;

export default SignUpPage;
