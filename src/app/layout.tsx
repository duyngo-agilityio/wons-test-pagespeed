// Libs
import type { Metadata } from 'next';

// Contexts
import { LayoutProvider } from '@/contexts';

// Constants
import { DM_SANS_FONT, IMAGES } from '@/constants';

// Styles
import '@/styles/index.css';
import { Sidebar } from '@/layouts';

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
        url: IMAGES.LOGO,
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
        <main>
          <LayoutProvider>
            <div className="lg:flex">
              <Sidebar />
              <div className="flex-1 pt-7.5 base:px-6 md:pl-7.5 md:pr-7 mb-8 max-w-[1324px] mx-auto">
                {children}
              </div>
            </div>
          </LayoutProvider>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
