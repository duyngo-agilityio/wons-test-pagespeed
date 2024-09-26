'use client';

import { Key, useMemo } from 'react';

// Components
import { Table } from '@/components';

// Types
import { TProductDataResponse } from '@/types';

// Utils
import { mappingContentColumns } from '@/utils';

type TProductData = TProductDataResponse;

type ProductTableProps = {
  data: TProductData[];
  isReadOnly?: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onRowAction?: (key: Key) => void;
};

const ProductTable = ({
  data = [],
  isReadOnly = true,
  onEdit,
  onDelete,
  onRowAction,
}: ProductTableProps): JSX.Element => {
  const columns = useMemo(
    () => mappingContentColumns({ data, isReadOnly, onEdit, onDelete }),
    [data, isReadOnly, onDelete, onEdit],
  );

  return (
    <div className="flex flex-col gap-10">
      <Table
        isStriped
        variant="secondary"
        columns={columns}
        data={data}
        onRowAction={onRowAction}
      />
    </div>
  );
};

export default ProductTable;
