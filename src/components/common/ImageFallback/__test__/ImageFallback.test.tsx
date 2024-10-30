import { fireEvent, render } from '@testing-library/react';
import { act } from 'react';

// Constants
import { BLUR_SRC, FALLBACK_SRC, IMAGES } from '@/constants';

// Components
import ImageFallback from '../index';

describe('ImageFallback component', () => {
  const renderComponent = (props?: Record<string, string>) =>
    render(
      <ImageFallback
        src={IMAGES.DEFAULT}
        alt="image"
        blurDataURL={BLUR_SRC.DEFAULT}
        fallbackSrc={FALLBACK_SRC.DEFAULT}
        width={300}
        height={300}
        {...props}
      />,
    );

  it('should match snapshot for ImageFallback', () => {
    const { container } = renderComponent();

    expect(container).toMatchSnapshot();
  });

  it('switches to fallbackSrc on error', async () => {
    const { getByAltText } = renderComponent();
    const image = getByAltText('image') as HTMLImageElement;

    await act(async () => {
      image.onerror?.(new Event('error'));
    });

    expect(image.src).toContain('http://localhost/');
  });

  it('switches to fallbackSrc when loading completes with broken image', async () => {
    const { getByAltText } = renderComponent();
    const image = getByAltText('image') as HTMLImageElement;

    await act(async () => {
      fireEvent.load?.(image);
    });

    expect(image.src).toContain('http://localhost/');
  });
});
