import type { Meta } from '@storybook/react';

// Mocks
import { columnsProductsTable, productMock } from '@/mocks';

// Components
import { Table } from './index';

const meta: Meta<typeof Table> = {
  component: Table,
};

export default meta;

const props = {
  columns: columnsProductsTable,
  data: productMock,
};

export const Primary = () => <Table {...props} variant="primary" />;

export const Secondary = () => (
  <div className="bg-[white] p-[20px] rounded-2xl">
    <Table {...props} variant="secondary" isStriped />
  </div>
);
