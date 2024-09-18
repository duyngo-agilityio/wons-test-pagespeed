// Layouts
import { Sidebar } from '@/layouts';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="lg:flex">
      <Sidebar />
      <div className="flex-1 pt-7.5 base:px-6 md:pl-7.5 md:pr-7 mb-8">
        {children}
      </div>
    </div>
  );
}
