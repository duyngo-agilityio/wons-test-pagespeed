'use client';

import { Autocomplete, Button, Input, Table, Text } from '@/components';
import { IProduct, TInvoiceProduct } from '@/models';
import { formatTotalAmount } from '@/utils';
import { Key, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { TbSquareRoundedPlusFilled } from 'react-icons/tb';

interface InvoiceProductTableProps {
  // data: TInvoiceProduct<IProduct>[];
  products: IProduct[];
}

const initInvoiceProduct = {
  id: '',
  quantity: 0,
  price: 0,
  product: {
    data: {
      id: '',
      price: 0,
      imageUrl: '',
      title: '',
      rating: 0,
    },
  },
};

const InvoiceProductTable = ({ products }: InvoiceProductTableProps) => {
  const [productsValues, setProductsValues] = useState<
    TInvoiceProduct<IProduct>[]
  >([]);
  const [errorProducts, setErrorProducts] = useState<string>('');

  const handleAddProduct = () => {
    setErrorProducts('');
    setProductsValues((prev) => [...prev, initInvoiceProduct]);
  };

  const handleChangeProductName = (key: Key | null) => {
    const product = products.find((product) => product.id === key);
    setErrorProducts('');

    if (product) {
      setProductsValues((prevProducts) => {
        if (prevProducts.length === 0)
          return [
            { product: { data: product }, quantity: 1, price: product.price },
          ];

        return prevProducts.map((p) =>
          p.product.data.id === key
            ? { product: { data: product }, quantity: 1, price: product.price }
            : p,
        );
      });
    }
  };

  const optionsProducts = products.map((product) => ({
    value: product.id,
    label: product.title,
  }));

  const columnTable = [
    {
      header: 'Product Name',
      accessor: ({ product }: TInvoiceProduct<IProduct>) => {
        const optionsElse = optionsProducts.filter(
          ({ value }) =>
            !productsValues.some(({ product }) => product.data.id === value),
        );

        const current = optionsProducts.filter(
          ({ value }) => value === product.data.id,
        );

        console.log(product.data.id, 'product.data.id');
        console.log(current, '-------->current');
        console.log(optionsElse, '-------->optionsElse');

        return (
          <Autocomplete
            onSelectionChange={handleChangeProductName}
            value={product.data.title}
            options={[...current, ...optionsElse]}
            className="!text-blue-500 text-[14.22px] leading-[18.51px]"
          />
        );
      },
      isSort: true,
    },
    {
      header: 'Rate',
      accessor: ({ product }: TInvoiceProduct<IProduct>) => {
        return <Text text={`$${product.data.price}`} className="text-end" />;
      },
      isSort: true,
    },
    {
      header: 'QTY',
      accessor: ({ quantity }: TInvoiceProduct<IProduct>) => (
        <Input
          value={quantity.toString()}
          classNames={{
            base: 'w-[65px]',
            inputWrapper: 'bg-white shadow-none px-2',
          }}
          endContent={<Text text="Pcs" />}
        />
      ),
      isSort: true,
    },
    {
      header: 'Amount',
      accessor: ({ product, quantity }: TInvoiceProduct<IProduct>) => (
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
      accessor: () => (
        <Button
          variant="ghost"
          className="rounded-[100%] p-[10px] !bg-pink-500/5"
          endContent={<FaTrash className="text-pink-500" />}
        />
      ),
    },
  ];

  return (
    <div>
      <div className="flex items-center justify-between">
        <Text
          text="Product Description"
          className="font-medium text-[16px] leading-[20.83px]"
        />
        <Button
          variant="ghost"
          className="!bg-white p-0"
          isDisabled={productsValues.length === products.length}
          onClick={handleAddProduct}
          endContent={
            <TbSquareRoundedPlusFilled size={34} className="text-blue-500" />
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
