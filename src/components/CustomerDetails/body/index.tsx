import { memo } from 'react';

// Components
import { EmailIcon, FaLocationDot, ImPhone, Text } from '@/components/common';

// Utils
import { formatPhoneNumberTyping } from '@/utils';

interface ICustomerDetailsBody {
  email: string;
  phone: string;
  address: string;
}

const CustomerDetailsBody = ({
  email,
  phone,
  address,
}: ICustomerDetailsBody) => (
  <div className="flex flex-col gap-2.5 mt-10">
    <Text text="Contact info" className="capitalize font-medium" size="xxl" />
    <div>
      <div className="flex items-center gap-2 border-b-1 border-blue-800/10 dark:border-white/10 py-4">
        <EmailIcon
          className="text-blue-800/30 dark:text-white/30"
          fontSize={16}
        />
        <Text text={email} size="xl" className="opacity-70 font-medium" />
      </div>
      <div className="flex items-center gap-2 border-b-1 border-blue-800/10 dark:border-white/10 py-4">
        <ImPhone
          className="text-blue-800/30 dark:text-white/30"
          fontSize={16}
        />
        <Text
          text={formatPhoneNumberTyping(phone)}
          size="xl"
          className="opacity-70 font-medium"
        />
      </div>
      <div className="flex items-center gap-2 py-4">
        <FaLocationDot
          className="text-blue-800/30 dark:text-white/30"
          fontSize={16}
        />
        <Text text={address} size="xl" className="opacity-70 font-medium" />
      </div>
    </div>
  </div>
);

export default memo(CustomerDetailsBody);
