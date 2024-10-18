import { Metadata } from 'next';

import { notFound } from 'next/navigation';

// Utils
import { isAdmin } from '@/utils';

// Layouts
import { DashBoardLayout } from '@/layouts';

// Constants
import { IMAGES } from '@/constants';

// UI
import { EditInvoice } from '@/ui';

export const metadata: Metadata = {
  title: 'Wons Edit Invoice',
  description: 'Edit an existing invoice on the list',
  openGraph: {
    title: 'Wons Edit Invoice',
    description: 'Edit an existing invoice on the list',
    images: [
      {
        url: IMAGES.PREVIEW_IMAGE,
        alt: 'preview image',
      },
    ],
  },
};

interface CustomersProps {
  searchParams: {
    id: number;
  };
}

const EditInvoicePage = async ({
  searchParams,
}: CustomersProps): Promise<JSX.Element> => {
  const isSuperAdmin = await isAdmin();

  const { id } = searchParams;

  if (!isSuperAdmin) notFound();

  return (
    <DashBoardLayout title="Edit Invoice">
      <EditInvoice id={id} />
    </DashBoardLayout>
  );
};

export default EditInvoicePage;
