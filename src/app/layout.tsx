// Libs
import type { Metadata } from 'next';

// Contexts
import { LayoutProvider } from '@/contexts';

// Constants
import { DM_SANS_FONT, IMAGES } from '@/constants';

// Styles
import '@/styles/index.css';

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
        url: IMAGES.PREVIEW_IMAGE,
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
}>) => (
  <html lang="en">
    <body className={`${DM_SANS_FONT.variable} font-dm-sans`}>
      <main>
        <LayoutProvider>{children}</LayoutProvider>
      </main>
    </body>
  </html>
);

export default RootLayout;
