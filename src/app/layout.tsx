// Libs
import type { Metadata } from 'next';

// Contexts
import { LayoutProvider } from '@/contexts';

// Constants
import { DM_SANS_FONT } from '@/constants';

import '@/styles/global.css';

export const metadata: Metadata = {
  title: 'Wons Dashboard',
  description:
    'Wons dashboard managing user-contributed templates and daily personal tasks.',
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${DM_SANS_FONT.variable} font-dm-sans`}>
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}
