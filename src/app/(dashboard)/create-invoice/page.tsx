import { Metadata } from 'next';
import { lazy, Suspense } from 'react';

// Layouts
import { DashBoardLayout } from '@/layouts';

const LazyCreateInvoice = lazy(() => import('@/ui/create-invoice'));

// Constants
import { IMAGES } from '@/constants';

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
  return (
    <DashBoardLayout title="Create New Invoice">
      <Suspense>
        <LazyCreateInvoice />
      </Suspense>
    </DashBoardLayout>
  );
};

export default CreateInvoicePage;
