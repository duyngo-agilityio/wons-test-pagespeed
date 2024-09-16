// Actions
import { createInvoiceAction } from '@/actions';

// Api
import { getCustomers, getProducts } from '@/api';

// Utils
import { formattedResponseData, generateRandomID } from '@/utils';

// Components
import { Heading, InvoiceForm } from '@/components';

const CreateInvoice = async () => {
  const { data: products } = await getProducts();
  const { data: customers } = await getCustomers();

  return (
    <div className="bg-white dark:bg-gray-400 p-[30px] rounded-[10px] h-[calc(full-60px)]">
      <Heading title="Create New Invoice" />
      <div className="flex w-full justify-center">
        <InvoiceForm
          invoiceId={generateRandomID()}
          onSubmit={createInvoiceAction}
          products={formattedResponseData(products ?? [])}
          customers={formattedResponseData(customers ?? [])}
        />
      </div>
    </div>
  );
};

export default CreateInvoice;
