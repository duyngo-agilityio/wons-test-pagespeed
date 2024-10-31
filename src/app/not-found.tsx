import { SessionProvider } from 'next-auth/react';

// components
import { NotFoundComponent } from '@/components';

// Layouts
import { Sidebar } from '@/layouts';

const NotFound = () => (
  <SessionProvider>
    <div className="lg:flex">
      <Sidebar />
      <div className="flex-1 pt-7.5 base:px-6 md:pl-7.5 md:pr-7 mb-8 max-w-[1324px] mx-auto">
        <NotFoundComponent />
      </div>
    </div>
  </SessionProvider>
);
export default NotFound;
