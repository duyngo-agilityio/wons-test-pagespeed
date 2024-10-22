import { Skeleton } from '@nextui-org/react';

// components
import { Text } from '@/components';

const InvoiceDetailsFooterSkeleton = () => (
  <div className="flex base:flex-col lg:flex-row base:gap-5 lg:justify-between base:px-2 md:pl-7.5 md:pr-5">
    <div className="flex flex-col">
      <Text
        text="Your company"
        size="4xs"
        className="text-gray-200 uppercase"
      />
      <Text
        text="1331 Hart Ridge Road, 48436 Gaines, MI"
        size="4xs"
        className="text-gray-200"
      />
    </div>

    <div className="flex flex-col">
      <div className="flex items-center gap-2.5">
        <Text text="@" size="4xs" className="text text-blue-500" />
        <Skeleton className="flex w-16 h-2 rounded-5" />
      </div>
      <div className="flex items-center gap-2.5">
        <Text text="m" size="4xs" className="text text-blue-500" />
        <Skeleton className="flex w-16 h-2 rounded-5" />
      </div>
    </div>

    <div className="flex lg:flex-col lg:items-end">
      <Text
        text="The company is registered in the "
        size="4xs"
        className="text-gray-200"
      />
      <Text
        text="business register under no. 87650000"
        size="4xs"
        className="text-gray-200"
      />
    </div>
  </div>
);

export default InvoiceDetailsFooterSkeleton;
