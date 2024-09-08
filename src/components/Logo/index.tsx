// Libs
import { memo } from 'react';
import Link from 'next/link';

// Constants
import { IMAGES, ROUTES } from '@/constants';

// Components
import { ImageFallback } from '@/components';

interface LogoProps {
  size?: 'sm' | 'lg';
}

const Logo = ({ size = 'lg' }: LogoProps): JSX.Element => {
  return (
    <Link href={ROUTES.DASHBOARD}>
      <ImageFallback
        priority
        src={IMAGES.LOGO}
        placeholder="empty"
        alt="wons-logo"
        width={size === 'lg' ? 90 : 42}
        height={size === 'lg' ? 56 : 26}
      />
    </Link>
  );
};

export default memo(Logo);
