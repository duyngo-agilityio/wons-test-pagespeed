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
  const sortBy: string = searchParams.sortBy;
  const order: string = searchParams.order;
  const startTime: string = searchParams.startTime;
  const endTime: string = searchParams.endTime;
  const filters: Record<string, string> = {
    'createdAt[$gte]': startTime,
    'createdAt[$lte]': endTime,
  };
  const result: StrapiResponse<
    StrapiModel<TInvoiceProduct<StrapiModel<IProduct>>>[]
  > = (await getInvoiceProducts({
    sort: searchParams.sortBy
      ? `${sortBy === 'title' ? `product.${sortBy}` : sortBy}:${order}`
      : '',
    filters,
  })) as StrapiResponse<StrapiModel<TInvoiceProduct<StrapiModel<IProduct>>>[]>;

  return (
    <TableLayout>
      <RecentServicesTable data={result.data} order={order} />
    </TableLayout>
  );
};

export default RecentServicesSection;
