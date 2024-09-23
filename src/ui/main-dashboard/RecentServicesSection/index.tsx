// Api
import { getInvoiceProducts } from '@/api';

// Layouts
import { TableLayout } from '@/layouts';

// Types
import { ISearchParams, TRecentInvoiceProductResponse } from '@/types';

// Components
import { RecentServicesTable } from '@/components';

interface IRecentServicesSection {
  searchParams: ISearchParams;
}

const RecentServicesSection = async ({
  searchParams,
}: IRecentServicesSection) => {
  const {
    sortBy = '',
    order = '',
    startTime = '',
    endTime = '',
  } = searchParams || {};

  const filters: Record<string, string> = {
    'createdAt[$gte]': startTime,
    'createdAt[$lte]': endTime,
  };
  const result: TRecentInvoiceProductResponse = (await getInvoiceProducts({
    sort: searchParams.sortBy
      ? `${sortBy === 'title' ? `product.${sortBy}` : sortBy}:${order}`
      : '',
    filters,
  })) as TRecentInvoiceProductResponse;

  return (
    <TableLayout>
      <RecentServicesTable data={result.data} order={order} />
    </TableLayout>
  );
};

export default RecentServicesSection;
