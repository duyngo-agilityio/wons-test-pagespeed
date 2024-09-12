// Constants
import { InvoiceStatus } from '@/constants';

// Types
import { ICustomer } from './customer';

export interface IInvoice {
  id: string;
  email: string;
  imageUrl: string;
  customer: ICustomer;
  date: string;
  status: InvoiceStatus;
  address: string;
  isSelected: boolean;
}
