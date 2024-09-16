import { memo } from 'react';
import isEqual from 'react-fast-compare';

// Models
import { ICustomer } from '@/models';

// Utils
import { formatPhoneNumber } from '@/utils';

// Constants
import { IMAGES } from '@/constants';

// Components
import { Image, Text } from '@/components';
import Link from 'next/link';

interface IInvoiceDetailsHeaderProps {
  customer: ICustomer;
}

const InvoiceDetailsHeader = ({ customer }: IInvoiceDetailsHeaderProps) => {
  const {
    email = '',
    fullName = '',
    address = '',
    phone = '',
  } = customer ?? {};
  return (
    <div className="flex items-center justify-between bg-gray-50 dark:bg-blue-800 base:px-2 md:pl-7.5 md:pr-5 pb-6.5 pt-10">
      <div className="flex flex-col gap-[37px]">
        <Image
          src={IMAGES.LOGO_COMPANY}
          alt="logo-detail"
          width={30}
          height={44}
        />
        <div className="flex flex-col gap-[15px]">
          <Text text="Recipient" size="3xs" className="uppercase font-bold" />
          <div>
            <Text
              text={fullName}
              size="2xs"
              className="uppercase text-gray-200"
            />
            <Text
              text={address}
              size="2xs"
              className="text-gray-200 base:w-[100px] lg:w-full"
            />
            <Text
              text="VAT no.: 12345678"
              size="2xs"
              className="text-gray-200"
            />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <Text text="@" size="3xs" className="text text-blue-500" />
              <Link href={`mailto:${email}`}>
                <Text text={email} size="2xs" className="text-gray-200" />
              </Link>
            </div>
            <div className="flex items-center gap-2.5">
              <Text text="m" size="3xs" className="text text-blue-500" />
              <Link href={`tel:${formatPhoneNumber}`}>
                <Text
                  text={formatPhoneNumber(phone)}
                  size="2xs"
                  className="text-gray-200"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-end gap-[26px]">
        <div>
          <div className="flex items-center gap-2.5">
            <Text text="@" size="3xs" className="text text-blue-500" />
            <Link href="mailto:your.mail@gmail.com">
              <Text text="your.mail@gmail.com" size="2xs" />
            </Link>
          </div>
          <div className="flex items-center gap-2.5">
            <Text text="m" size="3xs" className="text text-blue-500" />
            <Link href="tel:+386 989 271 3115">
              <Text text="+386 989 271 3115" size="2xs" />
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-[15px]">
          <Text text="Invoice" size="3xl" className="font-bold" />
          <div>
            <Text text="invoice no." size="2xs" />
            <Text text="001/2021" size="3xs" className="text-gray-200" />
          </div>
          <div>
            <Text text="Invoice date" size="2xs" />
            <Text text="January 1, 2021" size="2xs" className="text-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(InvoiceDetailsHeader, isEqual);
