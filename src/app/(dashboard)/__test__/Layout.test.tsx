import { render } from '@testing-library/react';
import RootLayout from '../layout';

jest.mock('@/layouts', () => ({
  Sidebar: () => <div>Sidebar</div>,
}));

describe('RootLayout', () => {
  it('should render correctly and match snapshot', async () => {
    const { container } = render(
      <RootLayout>
        <div>Content</div>
      </RootLayout>,
    );

    expect(container).toMatchSnapshot();
  });
});
