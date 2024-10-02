'use client';

import { Key, memo, useCallback, useMemo, useState } from 'react';

// Components
import { Table } from '@/components';

// Types
import { TProductInvoiceResponse } from '@/types';

// Utils
import { calcTotalAmount, mappingContentColumns } from '@/utils';

// constants
import { ORDER } from '@/constants';
import isEqual from 'react-fast-compare';

type ProductTableProps = {
  data: TProductInvoiceResponse[];
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
  const { ASC, DESC } = ORDER;
  const [productsBySort, setProductsBySort] =
    useState<TProductInvoiceResponse[]>(data);
  const [order, setOrder] = useState<string>(ASC);
  const [sortBy, setSortBy] = useState<string>('');
  const columns = useMemo(
    () => mappingContentColumns({ data, isReadOnly, onEdit, onDelete }),
    [data, isReadOnly, onDelete, onEdit],
  );

  /**
   * Handles sorting of products based on the selected value
   * @param {string} value - The value to sort by (id, title, price, quantity, totalSale)
   *
   * Previous product and Behind product represent two products being compared for sorting
   * @param {object} previousProduct - The first product to compare
   * @param {object} behindProduct - The second product to compare
   */
  const handleSort = useCallback(
    (value: string) => {
      setSortBy(value);
      setOrder((prev) => (prev === ASC ? DESC : ASC));

      const isASC = order === ASC;

      switch (value) {
        case 'id':
          setProductsBySort(data);

          setProductsBySort((prev) =>
            prev.toSorted((previousProduct, behindProduct) =>
              isASC
                ? prev.indexOf(behindProduct) - prev.indexOf(previousProduct)
                : prev.indexOf(previousProduct) - prev.indexOf(behindProduct),
            ),
          );
          break;

        case 'title':
          setProductsBySort((prev) =>
            prev.toSorted((previousProduct, behindProduct) => {
              const { title: titleFirst = '' } =
                previousProduct?.attributes?.product?.data?.attributes ?? {};
              const { title: titleSecond = '' } =
                behindProduct?.attributes?.product?.data?.attributes ?? {};

              return isASC
                ? titleSecond.localeCompare(titleFirst)
                : titleFirst.localeCompare(titleSecond);
            }),
          );
          break;

        case 'price':
          setProductsBySort((prev) =>
            prev.toSorted((previousProduct, behindProduct) => {
              const { price: priceFirst = 0 } =
                previousProduct?.attributes?.product?.data?.attributes ?? {};
              const { price: priceSecond = 0 } =
                behindProduct?.attributes?.product?.data?.attributes ?? {};

              return isASC
                ? priceSecond - priceFirst
                : priceFirst - priceSecond;
            }),
          );
          break;

        case 'quantity':
          setProductsBySort((prev) =>
            prev.toSorted((previousProduct, behindProduct) => {
              const { quantity: quantityFirst = 0 } =
                previousProduct?.attributes ?? {};
              const { quantity: quantitySecond = 0 } =
                behindProduct?.attributes ?? {};

              return isASC
                ? quantitySecond - quantityFirst
                : quantityFirst - quantitySecond;
            }),
          );
          break;

        case 'totalSale':
          setProductsBySort((prev) =>
            prev.toSorted((previousProduct, behindProduct) => {
              const { quantity: quantityFirst = 0 } =
                previousProduct?.attributes ?? {};
              const { price: priceFirst = 0 } =
                previousProduct?.attributes?.product?.data?.attributes ?? {};
              const { quantity: quantitySecond = 0 } =
                behindProduct?.attributes ?? {};
              const { price: priceSecond = 0 } =
                behindProduct?.attributes?.product?.data?.attributes ?? {};

              return isASC
                ? calcTotalAmount(priceFirst, quantityFirst) -
                    calcTotalAmount(priceSecond, quantitySecond)
                : calcTotalAmount(priceSecond, quantitySecond) -
                    calcTotalAmount(priceFirst, quantityFirst);
            }),
          );
          break;
        default:
          return data;
      }
    },
    [data, order],
  );

  return (
    <div className="flex flex-col gap-10">
      <Table
        isStriped
        variant="secondary"
        columns={columns}
        data={productsBySort}
        order={order}
        sortBy={sortBy}
        onRowAction={onRowAction}
        onSort={handleSort}
      />
    </div>
  );
};

export default memo(ProductTable, isEqual);
