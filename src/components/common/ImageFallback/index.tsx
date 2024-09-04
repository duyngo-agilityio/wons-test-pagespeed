'use client';

import { memo, useCallback, useState } from 'react';
import Image, { ImageProps } from 'next/image';

// Constants
import { BLUR_SRC, FALLBACK_SRC } from '@/constants';

interface ImageFallbackProps extends ImageProps {
  src: string;
  alt: string;
  blurDataURL?: string;
  fallbackSrc?: string;
}

const ImageFallback = ({
  src,
  alt,
  blurDataURL = BLUR_SRC.DEFAULT,
  fallbackSrc = FALLBACK_SRC.DEFAULT,
  ...rest
}: ImageFallbackProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  const handleFallbackImage = useCallback(
    () => setImgSrc(fallbackSrc),
    [fallbackSrc],
  );

  const handleLoadingComplete = useCallback(
    (result: HTMLImageElement) => {
      if (result.naturalWidth === 0) setImgSrc(fallbackSrc);
    },
    [fallbackSrc],
  );

  return (
    <Image
      src={imgSrc}
      alt={alt}
      placeholder="blur"
      blurDataURL={blurDataURL}
      onLoadingComplete={handleLoadingComplete}
      onError={handleFallbackImage}
      {...rest}
    />
  );
};

export default memo(ImageFallback);
