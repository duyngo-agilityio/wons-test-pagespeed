import { notFound } from 'next/navigation';

// Api
import { getInvoiceProducts } from '@/api';

// Layouts
import { TableLayout } from '@/layouts';

// Types
import { ISearchParams, TInvoiceProductData } from '@/types';

// Components
import { ErrorBoundary, RecentServicesTable } from '@/components';

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
  const { error, data } = await getInvoiceProducts({
    sort: searchParams.sortBy
      ? `${sortBy === 'title' ? `product.${sortBy}` : sortBy}:${order}`
      : '',
    filters,
  });

  if (error) {
    return <ErrorBoundary error={error} className="max-h-[400px]" />;
  }

  if (!data) notFound();

  const result: TInvoiceProductData = data?.data ?? [];

  return (
    <TableLayout>
      <RecentServicesTable data={result} order={order} />
    </TableLayout>
  );
};

export default RecentServicesSection;
