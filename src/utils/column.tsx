// Types
import { TProductInvoiceResponse } from '@/types';

// Utils
import {
  getSerialNumberWithMedal,
  formatPrice,
  formatTotalAmount,
} from '@/utils';

// Components
import { DropdownActions, Text, ImageFallback } from '@/components';

type TColumn = {
  data: TProductInvoiceResponse[];
  isReadOnly: boolean;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
};

// Columns for Top Selling Product table
export const mappingContentColumns = ({
  data,
  isReadOnly,
  onEdit,
  onDelete,
}: TColumn) => {
  return [
    {
      header: 'SN',
      accessor: (productData: TProductInvoiceResponse) =>
        getSerialNumberWithMedal<TProductInvoiceResponse>(data, productData),
      isSort: true,
      value: 'id',
    },
    {
      header: 'Name',
      accessor: (productData: TProductInvoiceResponse) => {
        const { attributes } = productData || {};
        const { product } = attributes || {};
        const { data } = product || {};
        const { attributes: attributesProduct } = data || {};
        const { imageUrl = '', title = '' } = attributesProduct || {};

        return (
          <div className="flex gap-3.5 items-center h-[40px]">
            <ImageFallback
              width={40}
              height={40}
              sizes="40px"
              src={imageUrl}
              alt="customer avatar"
              className="rounded-full h-full object-cover"
            />
            <Text
              size="md"
              text={title}
              className="!text-blue-500 text-nowrap dark:!text-purple-500"
            />
          </div>
        );
      },
      isSort: true,
      value: 'title',
    },
    {
      header: 'Price',
      accessor: (productData: TProductInvoiceResponse) => {
        const { attributes } = productData || {};
        const { product } = attributes || {};
        const { data } = product || {};
        const { attributes: attributesProduct } = data || {};
        const { price = 0 } = attributesProduct || {};

        return (
          <Text
            size="md"
            text={`$${formatPrice(price)}`}
            className="text-nowrap"
          />
        );
      },
      isSort: true,
      value: 'price',
    },
    {
      header: 'Total Order',
      accessor: (productData: TProductInvoiceResponse) => {
        const { attributes } = productData || {};
        const { quantity = 0 } = attributes || {};

        return (
          <Text
            size="md"
            text={`${quantity.toString()} Piece`}
            className="text-nowrap"
          />
        );
      },
      isSort: true,
      value: 'quantity',
    },
    {
      header: 'Total Sales',
      accessor: (productData: TProductInvoiceResponse) => {
        const { attributes } = productData || {};
        const { quantity = 0 } = attributes || {};
        const { product } = attributes || {};
        const { data } = product || {};
        const { attributes: attributesProduct } = data || {};
        const { price = 0 } = attributesProduct || {};

        return (
          <Text
            size="md"
            text={
              quantity === 0 ? '$0' : `$${formatTotalAmount(price, quantity)}`
            }
            className="text-nowrap text-teal-600 dark:!text-teal-300"
          />
        );
      },
      isSort: true,
      value: 'totalSale',
    },
    {
      ...(!isReadOnly && {
        accessor: (customerData: TProductInvoiceResponse) => {
          const { id } = customerData || {};
          return (
            <DropdownActions id={id} onEdit={onEdit} onDelete={onDelete} />
          );
        },
      }),
    },
  ].filter((item) => Object.keys(item).length !== 0);
};
