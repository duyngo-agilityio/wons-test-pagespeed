'use client';

// Components
import { Heading } from '@/components';

const GlobalError = () => (
  <html lang="en">
    <body>
      <div className="text-center h-screen flex justify-center items-center flex-col">
        <Heading title="Something went wrong!" />
      </div>
    </body>
  </html>
);

export default GlobalError;
