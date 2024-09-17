// Actions
import { editInvoice } from '@/actions';

// Api
import { getCustomers, getInvoiceById, getProducts } from '@/api';

// Utils
import { formattedResponseData } from '@/utils';

// Components
import { Heading, InvoiceForm } from '@/components';

interface EditInvoiceProps {
  id: number;
}

const EditInvoice = async ({ id }: EditInvoiceProps) => {
  const { data: products } = await getProducts();
  const { data: customers } = await getCustomers();
  const { data: invoice } = await getInvoiceById({ id });

  const productInvoice = formattedResponseData(
    invoice.attributes.invoice_products.data,
  );

  const formattedPreviewProduct = productInvoice.map((data) => {
    const { id, price, quantity, product } = data;

    return {
      id,
      price,
      quantity,
      product: {
        data: {
          id: product.data.id,
          ...product.data.attributes,
        },
      },
    };
  });

  const formattedInvoice = {
    ...invoice.attributes,
    customer: invoice.attributes.customer?.data.id.toString() ?? '',
  };

  return (
    <div className="bg-white dark:bg-gray-400 p-[30px] rounded-[10px] h-[calc(full-60px)]">
      <Heading title="Edit Invoice" />
      <div className="flex w-full justify-center">
        <InvoiceForm
          invoiceId={formattedInvoice.invoiceId ?? ''}
          previewData={formattedInvoice}
          previewInvoiceProducts={formattedPreviewProduct}
          onSubmit={editInvoice}
          products={formattedResponseData(products ?? [])}
          customers={formattedResponseData(customers ?? [])}
        />
      </div>
    </div>
  );
};

export default EditInvoice;
