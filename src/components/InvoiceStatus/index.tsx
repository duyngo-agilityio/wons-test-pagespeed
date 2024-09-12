// Libs
import { Chip } from '@nextui-org/react';

// Constants
import { InvoiceStatus } from '@/constants';

type TInvoiceStatusProps = {
  variant?: InvoiceStatus;
};

const InvoiceStatusComponent = ({
  variant = InvoiceStatus.COMPLETE,
}: TInvoiceStatusProps): JSX.Element => {
  const chipClasses = {
    complete: {
      bg: 'bg-blue-500/10 dark:bg-purple-600/10',
      color: 'text-blue-500 dark:text-purple-600',
    },
    pending: {
      bg: 'bg-teal-500/10 dark:bg-teal-300/10',
      color: 'text-teal-500 dark:text-teal-300',
    },
    cancel: {
      bg: 'bg-pink-500/10',
      color: 'text-pink-500',
    },
  };

  return (
    <Chip
      classNames={{
        base: [
          'w-[162px] max-w-[162px] h-[45px] max-h-[45px] rounded-[22px]',
          `${chipClasses[variant].bg}`,
        ],
        content: [
          'text-center text-md capitalize',
          `${chipClasses[variant].color}`,
        ],
      }}
    >
      {variant}
    </Chip>
  );
};

export default InvoiceStatusComponent;
