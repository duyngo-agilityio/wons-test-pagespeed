// Mocks
import { columnsProductsTable, productMock } from '@/mocks';

// Components
import { Table } from '../index';

const props = {
  columns: columnsProductsTable,
  data: productMock,
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
