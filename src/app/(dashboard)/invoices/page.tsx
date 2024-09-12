// Layouts
import { DashBoardLayout } from '@/layouts';

// Models
import { IInvoice } from '@/models';

// Constants
import { InvoiceStatus } from '@/constants';

// Components
import { InvoicesTable } from '@/components';

const InvoiceListPage = (): JSX.Element => {
  // TODO: Update later
  const data: IInvoice[] = [
    {
      id: '876364',
      email: 'arroragaur@gmail.com',
      customer: {
        id: '1',
        name: '',
        firstName: 'Arroba',
        lastName: 'gaur',
        email: 'arroragaur@gmail.com',
        phone: '1234567890',
        gender: 'male',
        job: 'Software Enginneer',
        address: '56 Dien Bien Phu',
        avatar:
          'https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg',
      },
      date: '2024-08-27T04:26:10.184Z',
      status: InvoiceStatus.COMPLETE,
      isSelected: true,
      imageUrl: '',
      address: '',
    },
    {
      id: '876363',
      email: 'arroragaur@gmail.com',
      customer: {
        id: '1',
        name: '',
        firstName: 'Arroba',
        lastName: 'gaur',
        email: 'arroragaur@gmail.com',
        phone: '1234567890',
        gender: 'male',
        job: 'Software Enginneer',
        address: '56 Dien Bien Phu',
        avatar:
          'https://buffer.com/library/content/images/size/w1200/2023/10/free-images.jpg',
      },
      date: '2024-08-27T04:26:10.184Z',
      status: InvoiceStatus.PENDING,
      isSelected: false,
      imageUrl: '',
      address: '',
    },
    {
      id: '876362',
      email: 'arroragaur@gmail.com',
      customer: {
        id: '1',
        name: '',
        firstName: 'Arroba',
        lastName: 'gaur',
        email: 'arroragaur@gmail.com',
        phone: '1234567890',
        gender: 'male',
        job: 'Software Engineer',
        address: '56 Dien Bien Phu',
        avatar:
          'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      },
      date: '2024-08-27T04:26:10.184Z',
      status: InvoiceStatus.CANCEL,
      isSelected: true,
      imageUrl: '',
      address: '',
    },
  ];
  return (
    <DashBoardLayout title="Invoices">
      <InvoicesTable data={data} />
    </DashBoardLayout>
  );
};

export default InvoiceListPage;
