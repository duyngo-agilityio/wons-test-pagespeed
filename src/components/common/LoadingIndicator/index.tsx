// Components
import Spinner from '../Spinner';

const LoadingIndicator = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-9999">
    <Spinner size="lg" />
  </div>
);

export default LoadingIndicator;
