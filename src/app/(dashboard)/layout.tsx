// Components
import { Sidebar } from '@/components';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 pt-[36.97px] pl-[31.69px]">{children}</div>
    </div>
  );
}
