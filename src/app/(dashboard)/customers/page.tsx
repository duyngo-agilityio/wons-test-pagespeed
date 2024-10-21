import { Metadata } from 'next';
import { Suspense } from 'react';

// layouts
import { DashBoardLayout } from '@/layouts';

// uis
import { CustomerActions, CustomerList, CustomerListSkeleton } from '@/ui';

// constants
import { DEFAULT_PAGE, IMAGES, PAGE_TITLES } from '@/constants';

// types
import { ISearchParams } from '@/types';

export const metadata: Metadata = {
  title: 'Wons Customer',
  description:
    'Browse the list of all customers, including names, contact emails, and genders, phone numbers. Stay connected and access essential customers information.',
  openGraph: {
    title: 'Wons Customer',
    description:
      'Browse the list of all customers, including names, contact emails, and genders, phone numbers. Stay connected and access essential customers information.',
    images: [
      {
        url: IMAGES.PREVIEW_IMAGE,
        alt: 'preview image',
      },
    ],
  },
};

type TInvoiceListPageProps = {
  searchParams: ISearchParams;
};

const CustomerListPage = ({
  searchParams,
}: TInvoiceListPageProps): JSX.Element => {
  const { page = DEFAULT_PAGE, order, sortBy } = searchParams || {};

  return (
    <main>
      {/* TODO: Update later, add suspense for CustomerDrawer */}
      <DashBoardLayout
        title={PAGE_TITLES.CUSTOMER}
        rightContent={<CustomerActions />}
      >
        <Suspense key={page} fallback={<CustomerListSkeleton />}>
          <CustomerList page={+page} order={order} sortBy={sortBy} />
        </Suspense>
      </DashBoardLayout>
    </main>
  );
};

export default CustomerListPage;
