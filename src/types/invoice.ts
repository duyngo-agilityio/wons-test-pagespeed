import { DateValue } from '@nextui-org/react';

// Types
import { StrapiModel, StrapiResponse } from '@/types';

// Models
import { ICustomer, IProduct, TInvoice, TInvoiceProduct } from '@/models';

// Constants
import { InvoiceStatus } from '@/constants';

export type TInvoiceDataResponse = StrapiModel<
  TInvoice & { customer: { data: StrapiModel<ICustomer> } }
>;

export type TInvoiceListResponse = StrapiResponse<TInvoiceDataResponse[]>;

export type TInvoiceProductTable = TInvoiceProduct<IProduct & { id: number }>;

export type TInvoiceFormData = {
  invoiceId: string;
  date: DateValue;
  imageUrl: string;
  customer: string;
  status: InvoiceStatus;
  address: string;
  email: string;
  invoice_products: number[];
};
