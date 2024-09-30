'use client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { Key, useMemo } from 'react';

// Components
import { Table } from '@/components';

// Types
import { TProductInvoiceResponse } from '@/types';

// Utils
import { mappingContentColumns } from '@/utils';

// constants
import { ORDER, SEARCH_QUERIES } from '@/constants';

type ProductTableProps = {
  data: TProductInvoiceResponse[];
  isReadOnly?: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onRowAction?: (key: Key) => void;
  order?: string;
};

const ProductTable = ({
  data = [],
  isReadOnly = true,
  onEdit,
  onDelete,
  onRowAction,
  order = '',
}: ProductTableProps): JSX.Element => {
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const { replace } = useRouter();
  const paramsObject = searchParams
    ? Object.fromEntries(searchParams.entries())
    : {};

  const columns = useMemo(
    () => mappingContentColumns({ data, isReadOnly, onEdit, onDelete }),
    [data, isReadOnly, onDelete, onEdit],
  );

  const { ASC, DESC } = ORDER;

  const handleSort = (value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set(SEARCH_QUERIES.SORT_BY, value);
      params.set(SEARCH_QUERIES.ORDER, order === DESC ? ASC : DESC);
    }

    replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-10">
      <Table
        isStriped
        variant="secondary"
        columns={columns}
        data={data}
        order={order}
        sortBy={paramsObject.sortBy}
        onRowAction={onRowAction}
        onSort={handleSort}
      />
    </div>
  );
};

export default ProductTable;
