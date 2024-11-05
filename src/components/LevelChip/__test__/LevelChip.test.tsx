import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import LevelChip from '../index';

// Types
import { Level } from '@/types';

describe('LevelChip Component', () => {
  it('matches snapshot when level is medium and size is md', () => {
    const { container } = render(<LevelChip level={Level.Medium} size="md" />);
    expect(container).toMatchSnapshot();
  });

  it('applies default chip size when size is undefined', () => {
    const { container } = render(<LevelChip level={Level.Medium} />);

    expect(container.firstChild).toHaveClass(
      'px-[22px] h-[30px] max-h-[30px] rounded-[22px]',
    );
  });

  it('applies default chip size when size is invalid', () => {
    const { container } = render(
      <LevelChip
        level={Level.Medium}
        size={'invalid-size' as unknown as 'md' | 'lg' | 'sm'}
      />,
    );

    expect(container.firstChild).toHaveClass(
      'px-[22px] h-[30px] max-h-[30px] rounded-[22px]',
    );
  });
});
