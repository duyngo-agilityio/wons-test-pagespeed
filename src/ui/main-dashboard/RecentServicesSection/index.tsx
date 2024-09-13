import { notFound } from 'next/navigation';

// Api
import { getInvoiceProducts } from '@/api';

// Layouts
import { TableLayout } from '@/layouts';

// Models
import { IProduct, TInvoiceProduct } from '@/models';

// Types
import { ISearchParams, StrapiModel, StrapiResponse } from '@/types';

// Components
import { RecentServicesTable } from '@/components';

interface IRecentServicesSection {
  searchParams: ISearchParams;
}

const RecentServicesSection = async ({
  searchParams,
}: IRecentServicesSection) => {
  const sortBy = searchParams.sortBy;
  const order = searchParams.order;

  const result: StrapiResponse<
    StrapiModel<TInvoiceProduct<StrapiModel<IProduct>>>[]
  > = (await getInvoiceProducts({
    sort: searchParams.sortBy
      ? `${sortBy === 'title' ? `product.${sortBy}` : sortBy}:${order}`
      : '',
  })) as StrapiResponse<StrapiModel<TInvoiceProduct<StrapiModel<IProduct>>>[]>;

  if (!result.data.length) notFound();

  return (
    <TableLayout>
      <RecentServicesTable data={result.data} order={order} />
    </TableLayout>
  );
};

export default RecentServicesSection;
