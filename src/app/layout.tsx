// Libs
import type { Metadata } from 'next';

// Contexts
import { LayoutProvider } from '@/contexts';

// Constants
import { DM_SANS_FONT, IMAGE_URL } from '@/constants';

// Styles
import '@/styles/global.css';

export const metadata: Metadata = {
  title: 'Wons Dashboard',
  description:
    'Wons dashboard managing user-contributed templates and daily personal tasks.',
  openGraph: {
    title: 'Wons Dashboard',
    description:
      'Wons dashboard managing user-contributed templates and daily personal tasks.',
    images: [
      {
        url: IMAGE_URL.LOGO,
        alt: 'preview image',
      },
    ],
  },
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body className={`${DM_SANS_FONT.variable} font-dm-sans`}>
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
};

export default RootLayout;
