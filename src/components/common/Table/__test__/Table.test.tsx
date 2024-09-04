// Mocks
import { PRODUCT_MOCK, PRODUCT_TABLE_COLUMNS_MOCK } from '@/mocks';

// Components
import { Table } from '../index';

const props = {
  columns: PRODUCT_TABLE_COLUMNS_MOCK,
  data: PRODUCT_MOCK,
};

describe('Table', () => {
  it('should match snapshot for Table primary', () => {
    const { container } = testLibJestUtils.render(<Table {...props} />);

    expect(container).toMatchSnapshot();
  });

  it('should match snapshot for Table secondary', () => {
    const { container } = testLibJestUtils.render(
      <Table {...props} variant="secondary" isStriped />,
    );

    expect(container).toMatchSnapshot();
  });
});
