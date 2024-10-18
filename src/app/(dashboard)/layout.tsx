// Layouts
import { Sidebar } from '@/layouts';

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => (
  <div className="lg:flex">
    <Sidebar />
    <div className="flex-1 pt-7.5 base:px-6 md:pl-7.5 md:pr-7 mb-8 max-w-[1324px] mx-auto">
      {children}
    </div>
  </div>
);

export default RootLayout;
