'use client';

// Components
import InvoiceDetailsBodySkeleton from './body';
import InvoiceDetailsFooterSkeleton from './footer';
import InvoiceDetailsHeaderSkeleton from './header';

const InvoiceDetailsSkeleton = () => (
  <div className="max-w-[1440px] m-auto base:px-2 base:py-5 lg:p-7.5 bg-white dark:bg-gray-400 rounded-10">
    <InvoiceDetailsHeaderSkeleton />
    <InvoiceDetailsBodySkeleton />
    <InvoiceDetailsFooterSkeleton />
  </div>
);

export default InvoiceDetailsSkeleton;
