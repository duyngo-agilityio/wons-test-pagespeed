import { notFound } from 'next/navigation';

// Api
import { getInvoiceById } from '@/api';

// Models
import { ICustomer, IProduct, TInvoiceProduct } from '@/models';

// Types
import { StrapiModel } from '@/types';

// Components
import {
  InvoiceDetailsHeader,
  InvoiceDetailsBody,
  InvoiceDetailsFooter,
} from '@/ui/invoice-details';

// Constants
import { API_PATH } from '@/constants';

interface IInvoiceDetailsSectionProps {
  id: number;
}

const InvoiceDetailsSection = async ({ id }: IInvoiceDetailsSectionProps) => {
  const result = await getInvoiceById({
    id: id,
    nextOptions: { tags: [API_PATH.INVOICE] },
  });
  const customer: ICustomer =
    result.data.attributes.customer?.data.attributes ?? {};
  const invoices: StrapiModel<TInvoiceProduct<StrapiModel<IProduct>>>[] =
    result.data.attributes.invoice_products.data;

  if (!result.data) notFound();

  return (
    <div className="max-w-[1440px] m-auto base:px-2 base:py-5 lg:p-7.5 bg-white dark:bg-gray-400 rounded-10">
      <InvoiceDetailsHeader customer={customer} />
      <InvoiceDetailsBody data={invoices} />
      <InvoiceDetailsFooter customer={customer} />
    </div>
  );
};

export default InvoiceDetailsSection;
