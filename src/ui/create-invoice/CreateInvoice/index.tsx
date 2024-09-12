'use client';

import { Heading, InvoiceForm } from '@/components';
import { IInvoice } from '@/models';

const CreateInvoice = () => {
  const handleSubmit = (data: Partial<IInvoice>) => {
    console.log(data);
  };

  return (
    <div
      className="bg-white dark:bg-gray-400 p-[30px] rounded-[10px]"
      style={{ height: 'calc(100vh - 60px)' }}
    >
      <Heading title="Create New Invoice" />
      <div className="flex w-full justify-center">
        <InvoiceForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default CreateInvoice;
