// Constants
import { DEFAULT_PAGE } from '@/constants';

// Pages
import ProductListPage from '../products/page';

jest.mock('@/components', () => ({
  TableSkeleton: () => <div>Table Skeleton</div>,
}));

jest.mock('@/layouts', () => ({
  DashBoardLayout: () => <div>DashBoardLayout</div>,
}));

describe('ProductListPage', () => {
  it('should match sanpshot', () => {
    const { container } = testLibJestUtils.render(
      <ProductListPage
        searchParams={{
          page: String(DEFAULT_PAGE),
          startTime: '',
          endTime: '',
        }}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
