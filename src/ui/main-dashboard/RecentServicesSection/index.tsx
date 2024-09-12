import { notFound } from 'next/navigation';

// Api
import { getInvoiceProducts } from '@/api';

// Layouts
import { TableLayout } from '@/layouts';

// Models
import { IProduct, TInvoiceProduct } from '@/models';

// Types
import { StrapiModel, StrapiResponse } from '@/types';

// Components
import { RecentServicesTable } from '@/components';

const RecentServicesSection = async () => {
  const result: StrapiResponse<
    StrapiModel<TInvoiceProduct<StrapiModel<IProduct>>>[]
  > = (await getInvoiceProducts()) as StrapiResponse<
    StrapiModel<TInvoiceProduct<StrapiModel<IProduct>>>[]
  >;

  if (!result.data.length) notFound();

  return (
    <TableLayout>
      <RecentServicesTable data={result.data} />
    </TableLayout>
  );
};

export default RecentServicesSection;
