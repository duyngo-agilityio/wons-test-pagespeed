import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import GenderStatusComponent from '../index';

describe('GenderStatusComponent', () => {
  it('matches snapshot when gender is male', () => {
    const { container } = render(<GenderStatusComponent gender="male" />);
    expect(container).toMatchSnapshot();
  });

  it('matches snapshot when gender is female', () => {
    const { container } = render(<GenderStatusComponent gender="female" />);
    expect(container).toMatchSnapshot();
  });
});
