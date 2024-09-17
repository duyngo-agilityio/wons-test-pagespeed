'use client';

import { ChangeEvent, Dispatch, Key, SetStateAction, MouseEvent } from 'react';
import { FaTrash } from 'react-icons/fa';
import { TbSquareRoundedPlusFilled } from 'react-icons/tb';

// Components
import { Autocomplete, Button, Input, Table, Text } from '@/components';

// Constants
import { ERROR_MESSAGES, MAX_QUANTITY_PRODUCTS, REGEX } from '@/constants';

// Models
import { IProduct } from '@/models';

// Utils
import { formatTotalAmount } from '@/utils';

// Types
import { TInvoiceProductTable } from '@/types';

interface InvoiceProductTableProps {
  products: (IProduct & { id: number })[];
  errorProducts: string;
  productsValues: TInvoiceProductTable[];
  setProductsValues: Dispatch<SetStateAction<TInvoiceProductTable[]>>;
  setErrorProducts: Dispatch<SetStateAction<string>>;
}

const initInvoiceProduct = {
  id: '',
  quantity: 0,
  price: 0,
  product: {
    data: {
      id: 0,
      price: 0,
      imageUrl: '',
      title: '',
      rating: 0,
    },
  },
};

const InvoiceProductTable = ({
  setErrorProducts,
  setProductsValues,
  products,
  errorProducts,
  productsValues,
}: InvoiceProductTableProps) => {
  const handleAddProduct = () => {
    setErrorProducts('');
    setProductsValues((prev) => [...prev, initInvoiceProduct]);
  };

  const handleChangeProductName = (key: Key | null, id: number) => {
    const product = products.find((product) => product.id.toString() === key);
    setErrorProducts('');

    if (product) {
      setProductsValues((prevProducts) => {
        if (prevProducts.length === 0)
          return [
            { product: { data: product }, quantity: 1, price: product.price },
          ];

        return prevProducts.map((p) =>
          p.product.data.id === id
            ? { product: { data: product }, quantity: 1, price: product.price }
            : p,
        );
      });
    }
  };

  const optionsProducts = products.map((product) => ({
    value: product.id.toString(),
    label: product.title,
  }));

  const columnTable = [
    {
      header: 'Product Name',
      accessor: (data: TInvoiceProductTable) => {
        const optionsElse = optionsProducts.filter(
          ({ value }) =>
            !productsValues.some(
              ({ product }) => product.data.id.toString() === value,
            ),
        );

        const current = optionsProducts.filter(
          ({ value }) => value === data.product.data.id.toString(),
        );

        return (
          <Autocomplete
            disableClearable
            defaultSelectedKey={data.product.data.id.toString()}
            onSelectionChange={(key) =>
              handleChangeProductName(key, data.product.data.id)
            }
            options={[...current, ...optionsElse]}
            className="!text-blue-500 text-[14.22px] bg-white dark:bg-gray-400 leading-[18.51px]"
            inputProps={{
              classNames: {
                inputWrapper: 'bg-white dark:bg-gray-400 shadow-none',
                input: '!text-blue-500 dark:!text-purple-600',
              },
            }}
          />
        );
      },
      isSort: true,
    },
    {
      header: 'Rate',
      accessor: ({ product }: TInvoiceProductTable) => {
        return <Text text={`$${product.data.price}`} />;
      },
      isSort: true,
    },
    {
      header: 'QTY',
      accessor: ({ quantity, product }: TInvoiceProductTable) => (
        <Input
          value={quantity.toString()}
          classNames={{
            base: 'w-[65px]',
            inputWrapper: 'bg-white dark:bg-gray-400 shadow-none px-2',
          }}
          onChange={(e) => handleUpdateQuantity(e, product.data.id)}
          endContent={<Text text="Pcs" />}
        />
      ),
      isSort: true,
    },
    {
      header: 'Amount',
      accessor: ({ product, quantity }: TInvoiceProductTable) => (
        <Text
          className="text-end text-teal-500 pr-3"
          text={
            quantity === 0
              ? '$0'
              : `$${formatTotalAmount(product.data.price, quantity)}`
          }
        />
      ),
      isSort: true,
    },
    {
      accessor: ({ product }: TInvoiceProductTable) => (
        <Button
          variant="ghost"
          className="rounded-[100%] p-[10px] !bg-pink-500/5 dark:!bg-pink-500/5"
          data-id={product.data.id}
          endContent={<FaTrash className="text-pink-500" />}
          onClick={handleRemoveProduct}
        />
      ),
    },
  ];

  const handleUpdateQuantity = (
    e: ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    const { value } = e.target;

    // Find the product to update
    const product = products.find((product) => product.id === id);

    if (product) {
      if (!value) return setErrorProducts(ERROR_MESSAGES.QUANTITY_INVALID);

      // Validate and parse the value directly
      const parsedValue = Number(value);

      // Check if the value is a valid positive integer within the range of 0 to 99
      const isValidQuantity =
        !isNaN(parsedValue) &&
        parsedValue > 0 &&
        parsedValue <= MAX_QUANTITY_PRODUCTS &&
        REGEX.INTEGER.test(value);

      if (isValidQuantity || value === '') {
        setProductsValues((prevProducts) =>
          prevProducts.map((p) =>
            p.product.data.id === id
              ? { ...p, quantity: isValidQuantity ? parsedValue : 0 }
              : p,
          ),
        );
      }
    }
  };

  const handleRemoveProduct = (event: MouseEvent<HTMLElement>) => {
    const currentTarget = event.currentTarget as HTMLElement;

    const id = currentTarget.dataset.id;

    id &&
      setProductsValues((prev) =>
        prev.filter((product) => product.product.data.id !== Number(id)),
      );
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <Text
          text="Product Description"
          size="xl"
          className="font-medium leading-[20.83px]"
        />
        <Button
          variant="ghost"
          className="!bg-white dark:!bg-gray-400 p-0"
          isDisabled={productsValues.length === products.length}
          onClick={handleAddProduct}
          endContent={
            <TbSquareRoundedPlusFilled
              size={34}
              className="text-blue-500 dark:text-purple-600"
            />
          }
        />
      </div>

      <div className="mt-[17px]">
        <Table
          newData={initInvoiceProduct}
          columns={columnTable}
          data={productsValues}
          variant="secondary"
        />
        {errorProducts && (
          <Text text={errorProducts} className="text-red-400" />
        )}
      </div>
    </div>
  );
};

export default InvoiceProductTable;
