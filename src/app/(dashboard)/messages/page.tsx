import { Metadata } from 'next';

// Constants
import { IMAGES } from '@/constants';

// Components
import { Heading, Text } from '@/components';

export const metadata: Metadata = {
  title: 'Wons Messages',
  description: 'Contact support, and chat from the user side',
  openGraph: {
    title: 'Wons Messages',
    description: 'Contact support, and chat from the user side',
    images: [
      {
        url: IMAGES.PREVIEW_IMAGE,
        alt: 'preview image',
      },
    ],
  },
};

const MessagesPage = () => (
  <>
    <Heading size="lg" title="Messages page" />
    <div className="flex justify-center items-center h-full">
      <Text size="2xl" text="Coming soon!" className="mt-2" />
    </div>
  </>
);

export default MessagesPage;
