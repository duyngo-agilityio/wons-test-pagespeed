import { Metadata } from 'next';

// Components
import { Heading, Text } from '@/components';

// Constants
import { IMAGES } from '@/constants';

export const metadata: Metadata = {
  title: 'Wons Notification',
  description:
    'Manage all notifications about products, invoices, users, messages,...',
  openGraph: {
    title: 'Wons Notification',
    description:
      'Manage all notifications about products, invoices, users, messages,...',
    images: [
      {
        url: IMAGES.PREVIEW_IMAGE,
        alt: 'preview image',
      },
    ],
  },
};

const NotificationPage = () => (
  <>
    <Heading size="lg" title="Notification page" />
    <div className="flex justify-center items-center h-full">
      <Text size="2xl" text="Coming soon!" className="mt-2" />
    </div>
  </>
);

export default NotificationPage;
