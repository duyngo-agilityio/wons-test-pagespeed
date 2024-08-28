import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

// Contexts
import { LayoutProvider } from '@/contexts';

const inter = Inter({ subsets: ['latin'] });

import '@/styles/global.css';

export const metadata: Metadata = {
  title: 'Next.js Boilerplate',
  description: 'Next.js 14+ boilerplate app',
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
      <body className={inter.className}>
        <LayoutProvider>{children}</LayoutProvider>
      </body>
    </html>
  );
}
