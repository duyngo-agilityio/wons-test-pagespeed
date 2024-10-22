import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Utils
import { isAdmin } from '@/utils';

// Layouts
import { DashBoardLayout } from '@/layouts';

const LazyCreateInvoice = lazy(() => import('@/ui/create-invoice'));

// Constants
import { IMAGES } from '@/constants';
import { lazy, Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Wons Create New Invoice',
  description: 'Add a new invoice with multiple products',
  openGraph: {
    title: 'Wons Create New Invoice',
    description: 'Add a new invoice with multiple products',
    images: [
      {
        url: IMAGES.PREVIEW_IMAGE,
        alt: 'preview image',
      },
    ],
  },
};

const CreateInvoicePage = async (): Promise<JSX.Element> => {
  const isSuperAdmin = await isAdmin();

  if (!isSuperAdmin) notFound();

  return (
    <DashBoardLayout title="Create New Invoice">
      <Suspense>
        <LazyCreateInvoice />
      </Suspense>
    </DashBoardLayout>
  );
};

export default CreateInvoicePage;
