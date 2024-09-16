import { memo } from 'react';
import isEqual from 'react-fast-compare';

// Models
import { ICustomer } from '@/models';

// Utils
import { formatPhoneNumber } from '@/utils';

// Components
import { Text } from '@/components';
import Link from 'next/link';

interface IInvoiceDetailsFooterProps {
  customer: ICustomer;
}

const InvoiceDetailsFooter = ({ customer }: IInvoiceDetailsFooterProps) => {
  const { email = '', phone = '' } = customer ?? {};
  return (
    <div className="flex base:flex-col lg:flex-row base:gap-5 lg:justify-between base:px-2 md:pl-7.5 md:pr-5">
      <div>
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
      <div>
        <div className="flex items-center gap-2.5">
          <Text text="@" size="4xs" className="text text-blue-500" />
          <Link href={`mailto:${email}`}>
            <Text text={email} size="4xs" className="text-gray-200" />
          </Link>
        </div>
        <div className="flex items-center gap-2.5">
          <Text text="m" size="4xs" className="text text-blue-500" />
          <Link href={`tel:${formatPhoneNumber}`}>
            <Text
              text={formatPhoneNumber(phone)}
              size="4xs"
              className="text-gray-200"
            />
          </Link>
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
};

export default memo(InvoiceDetailsFooter, isEqual);
