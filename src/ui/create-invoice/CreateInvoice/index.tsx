'use client';

import { Heading, InvoiceForm } from '@/components';

const CreateInvoice = () => {
  const handleSubmit = () => {
    // TODO: update later..
  };

  return (
    <div className="bg-white dark:bg-gray-400 p-[30px] rounded-[10px] h-[calc(100vh-60px)]">
      <Heading title="Create New Invoice" />
      <div className="flex w-full justify-center">
        <InvoiceForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CreateInvoice;
