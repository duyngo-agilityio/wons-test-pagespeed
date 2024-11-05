import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

// Components
import InvoiceStatusComponent from '../index';

// Types
import { InvoiceStatus } from '@/types';

describe('InvoiceStatusComponent', () => {
  it('matches snapshot when variant is Default', () => {
    const { container } = render(
      <InvoiceStatusComponent variant={InvoiceStatus.Default} />,
    );
    expect(container).toMatchSnapshot();
  });
});
