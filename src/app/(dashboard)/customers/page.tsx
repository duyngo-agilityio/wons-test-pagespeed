import { Metadata } from 'next';

// layouts
import { DashBoardLayout } from '@/layouts';

// uis
import { CustomerList } from '@/ui';

// components
import { CustomerDrawerWrapper } from '@/components';

export const metadata: Metadata = {
  title: 'Customer Directory - View All Customers',
  description:
    'Browse the list of all customers, including names, contact emails, and genders, phone numbers. Stay connected and access essential customers information.',
};

const CustomerListPage = (): JSX.Element => (
  <main>
    <DashBoardLayout
      title="Customer List"
      rightContent={<CustomerDrawerWrapper />}
    >
      <CustomerList />
    </DashBoardLayout>
  </main>
);

export default CustomerListPage;
