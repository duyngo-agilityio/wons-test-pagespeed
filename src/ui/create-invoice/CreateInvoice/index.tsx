'use client';

import { Heading, InvoiceForm } from '@/components';

// TODO: integrate api get products
const products = [
  {
    id: '3',
    price: 1000,
    rating: 2,
    title: 'I phone 7 plus',
    imageUrl:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '4',
    price: 2000,
    rating: 4.6,
    title: 'Macbook pro haha',
    imageUrl:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: '5',
    price: 3000,
    rating: 2,
    title: 'Macbook pro hihi',
    imageUrl:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
  },
];

const CreateInvoice = () => {
  const handleSubmit = () => {
    // TODO: update later..
  };

  return (
    <div className="bg-white dark:bg-gray-400 p-[30px] rounded-[10px] h-[calc(full-60px)]">
      <Heading title="Create New Invoice" />
      <div className="flex w-full justify-center">
        <InvoiceForm onSubmit={handleSubmit} products={products} />
      </div>
    </div>
  );
};

export default CreateInvoice;
