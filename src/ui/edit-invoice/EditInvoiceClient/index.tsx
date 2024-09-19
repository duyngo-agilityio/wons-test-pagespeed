'use client';

// Models
import { ICustomer, IProduct, TInvoice } from '@/models';

// Types
import { TInvoiceProductTable } from '@/types';

// Components
import { Heading, InvoiceForm } from '@/components';

interface EditInvoiceClientProps {
  invoice: TInvoice & { id: number };
  invoiceProducts: TInvoiceProductTable[];
  products: (IProduct & { id: number })[];
  customers: (ICustomer & { id: number })[];
  onEditInvoice: (
    id: number,
    data: Partial<TInvoice>,
    products: number[],
  ) => Promise<{
    error?: string;
    success?: boolean;
  }>;
}

const EditInvoiceClient = ({
  invoice,
  invoiceProducts,
  customers,
  products,
  onEditInvoice,
}: EditInvoiceClientProps) => {
  const handleEditInvoice = async (
    data: Partial<TInvoice>,
    products: number[],
  ) => await onEditInvoice(invoice.id, data, products);

  return (
    <div className="bg-white dark:bg-gray-400 p-[30px] rounded-[10px] h-[calc(full-60px)]">
      <Heading title="Edit Invoice" />
      <div className="flex w-full justify-center">
        <InvoiceForm
          isEdit
          invoiceId={invoice.invoiceId ?? ''}
          previewData={invoice}
          previewInvoiceProducts={invoiceProducts}
          onSubmit={handleEditInvoice}
          products={products}
          customers={customers}
        />
      </div>
    </div>
  );
};

export default EditInvoiceClient;
