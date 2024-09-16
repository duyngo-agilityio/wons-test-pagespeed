import { Metadata } from 'next';

// Layouts
import { DashBoardLayout } from '@/layouts';

// Sections
import { CustomerList, CustomerActions } from '@/ui';

export const metadata: Metadata = {
  title: 'Customer Directory - View All Customers',
  description:
    'Browse the list of all customers, including names, contact emails, and genders, phone numbers. Stay connected and access essential customers information.',
};

const CustomerListPage = (): JSX.Element => (
  <main>
    <DashBoardLayout title="Customer List" rightContent={<CustomerActions />}>
      <CustomerList />
    </DashBoardLayout>
  </main>
);

export default CustomerListPage;
