import { fireEvent, render } from '@testing-library/react';

// Constants
import { BLUR_SRC, FALLBACK_SRC, IMAGE_SRC } from '@/constants';

// Components
import ImageFallback from '../index';

describe('ImageFallback component', () => {
  const renderComponent = (props?: Record<string, string>) =>
    render(
      <ImageFallback
        src={IMAGE_SRC.DEFAULT}
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

  it('switches to fallbackSrc on error', () => {
    const { getByAltText } = renderComponent();
    const image = getByAltText('image') as HTMLImageElement;

    image.onerror?.(new Event('error'));

    expect(image.src).toContain('http://localhost/');
  });

  it('switches to fallbackSrc when loading completes with broken image', () => {
    const { getByAltText } = renderComponent();
    const image = getByAltText('image') as HTMLImageElement;

    fireEvent.load?.(image);

    expect(image.src).toContain('http://localhost/');
  });
});
