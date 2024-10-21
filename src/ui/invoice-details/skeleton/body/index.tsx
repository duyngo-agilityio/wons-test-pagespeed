import { Skeleton } from '@nextui-org/react';

// Components
import { TableSkeleton, Text } from '@/components';

const MAPPING_PRODUCT_DESCRIPTIONS_SKELETON = [
  {
    header: 'PRODUCT DESCRIPTION',
    accessor: () => <Skeleton className="h-2 w-3/5 rounded-5" />,
  },
  {
    header: 'QUANTITY',
    accessor: () => <Skeleton className="h-2 w-3/5 rounded-5" />,
  },
  {
    header: 'RATE',
    accessor: () => <Skeleton className="h-2 w-3/5 rounded-5" />,
  },
  {
    header: 'AMOUNT',
    accessor: () => <Skeleton className="h-2 w-3/5 rounded-5" />,
  },
];

const InvoiceDetailsBodySkeleton = () => (
  <div className="base:px-2 md:pl-7.5 md:pr-5 pb-6.5 pt-10">
    <TableSkeleton
      isStripedRow
      isStriped={false}
      columns={MAPPING_PRODUCT_DESCRIPTIONS_SKELETON}
    />
    <div className="flex flex-col items-end">
      <div className="flex justify-between w-[65%] py-[17px] border-b-1 border-gray-50 dark:border-gray-50/50">
        <Text text="Subtotal" className="uppercase text-gray-200" size="2xs" />
        <Skeleton className="flex base:w-16 lg:w-40 h-5 rounded-5" />
      </div>
      <div className="flex justify-between w-[65%] py-[17px] border-b-1 border-gray-50 dark:border-gray-50/50">
        <Text
          text="Discount 5%"
          className="uppercase text-gray-200"
          size="2xs"
        />
        <Skeleton className="flex base:w-16 lg:w-40 h-5 rounded-5" />
      </div>
      <div className="flex justify-between w-[65%] py-[17px]">
        <Text text="Total" className="uppercase" size="2xs" />
        <Skeleton className="flex base:w-16 lg:w-40 h-5 rounded-5" />
      </div>
      <div className="flex flex-col py-4">
        <Text
          text="Transfer the amount to the business account below. Please include invoice number on your check."
          className="uppercase text-gray-200 mb-1.5"
          size="2xs"
        />
        <div className="flex justify-center gap-5">
          <div className="flex gap-1">
            <Text text="Bank:" className="uppercase text-gray-200" size="2xs" />
            <Text text="FTSBUS33" size="2xs" />
          </div>
          <div className="flex gap-1">
            <Text text="Iban:" className="uppercase text-gray-200" size="2xs" />
            <Text text="GB82-1111-2222-3333" size="2xs" />
          </div>
        </div>
      </div>
    </div>
    <div className="py-8 border-b-1 border-gray-50">
      <Text text="Notes" className="uppercase mb-4" size="2xs" />
      <Text
        text="All amounts are in dollars.
          Please make the payment within 15 days from the issue of date of this invoice.
          Tax is not charged on the basis of paragraph 1 of Article 94 of the Value Added
          Tax Act (I am not liable for VAT)."
        size="2xs"
        className="text-gray-200 mb-8"
      />
      <Text
        text="Thank you for you confidence in my work."
        size="2xs"
        className="text-gray-200"
      />
      <Text text="Signiture" size="2xs" className="text-gray-200" />
    </div>
  </div>
);

export default InvoiceDetailsBodySkeleton;
