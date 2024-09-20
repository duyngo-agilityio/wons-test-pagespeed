import { memo } from 'react';
import isEqual from 'react-fast-compare';

// Models
import { ICustomer } from '@/models';

// Components
import CustomerDetailsHeader from './header';
import CustomerDetailsBody from './body';

interface ICustomerDetails {
  customer: ICustomer;
}

const CustomerDetails = ({ customer }: ICustomerDetails) => {
  const {
    avatar = '',
    firstName = '',
    lastName = '',
    fullName = '',
    job = '',
    email = '',
    phone = '',
    address = '',
  } = customer ?? {};

  return (
    <div className="min-h-full max-w-[302px] bg-white dark:bg-gray-400 py-[62px] px-6">
      <CustomerDetailsHeader
        avatar={avatar}
        firstName={firstName}
        lastName={lastName}
        fullName={fullName}
        job={job}
      />
      <CustomerDetailsBody email={email} phone={phone} address={address} />
    </div>
  );
};

export default memo(CustomerDetails, isEqual);
