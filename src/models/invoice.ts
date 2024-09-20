// Constants
import { InvoiceStatus } from '@/constants';

export type TInvoiceProduct<T> = {
  id?: number;
  price: number;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  quantity: number;
  product: { data: T };
};

export type TInvoice = {
  invoiceId: string;
  customerId: string;
  imageUrl: string;
  status: InvoiceStatus;
  address: string;
  isSelected: boolean;
  date: string;
  email: string;
};
