// Types
import { TProductDataResponse } from '@/types';

// Utils
import {
  getSerialNumberWithMedal,
  formatPrice,
  formatTotalAmount,
} from '@/utils';

// Components
import { DropdownActions, Text, Image } from '@/components';

type TColumn = {
  data: TProductDataResponse[];
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
      accessor: (productData: TProductDataResponse) =>
        getSerialNumberWithMedal(data, productData),
      isSort: true,
      value: 'sn',
    },
    {
      header: 'Name',
      accessor: (productData: TProductDataResponse) => {
        const { attributes } = productData || {};
        const { title, imageUrl } = attributes || {};

        return (
          <div className="flex gap-3.5 items-center">
            <div className="relative w-9 h-9 rounded-full">
              <Image
                src={imageUrl}
                alt="customer avatar"
                fill
                objectFit="cover"
                className="rounded-full"
              />
            </div>
            <Text
              size="md"
              text={title}
              className="!text-blue-500 text-nowrap dark:!text-purple-600"
            />
          </div>
        );
      },
      isSort: true,
      value: 'fullName',
    },
    {
      header: 'Price',
      accessor: (productData: TProductDataResponse) => {
        const { attributes } = productData || {};
        const { price } = attributes || {};
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
      accessor: () => {
        const mockTotalOrder = '34,666 Piece';
        return <Text size="md" text={mockTotalOrder} className="text-nowrap" />;
      },
      isSort: true,
      value: 'totalPrice',
    },
    {
      header: 'Total Sales',
      accessor: (productData: TProductDataResponse) => {
        const { attributes } = productData || {};
        const { price } = attributes || {};
        const mockQuantity = 5;
        const mockTotalSale = `$${formatTotalAmount(price, mockQuantity)}`;

        return (
          <Text
            size="md"
            text={mockTotalSale}
            className="text-nowrap text-teal-500 dark:!text-teal-300"
          />
        );
      },
      isSort: true,
      value: 'totalSale',
    },
    {
      ...(!isReadOnly && {
        accessor: (customerData: TProductDataResponse) => {
          const { id } = customerData || {};
          return (
            <DropdownActions id={id} onEdit={onEdit} onDelete={onDelete} />
          );
        },
      }),
    },
  ].filter((item) => Object.keys(item).length !== 0);
};
