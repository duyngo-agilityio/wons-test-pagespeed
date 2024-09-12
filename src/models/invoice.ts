// Types
import { ICustomer } from './customer';

// Constants
import { InvoiceStatus } from '@/constants';

export type TInvoiceProduct<T> = {
  price: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  quantity: number;
  product: { data: T };
};

export interface IInvoice {
  id: string;
  customer: ICustomer;
  imageUrl: string;
  status: InvoiceStatus;
  address: string;
  isSelected: boolean;
  date: string;
  email: string;
}
