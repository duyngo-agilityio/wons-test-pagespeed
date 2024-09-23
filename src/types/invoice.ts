// Types
import { StrapiModel, StrapiResponse } from '@/types';

// Models
import { ICustomer, IProduct, TInvoice, TInvoiceProduct } from '@/models';

// Constants
import { InvoiceStatus } from '@/constants';

export type TInvoiceDataResponse = StrapiModel<
  Omit<TInvoice, 'customerId'> & {
    customer: { data: StrapiModel<ICustomer> };
    invoice_products: { data: StrapiModel<TInvoiceProduct<IProduct>>[] };
  }
>;

export type TInvoiceProductRequest = Omit<
  TInvoiceProduct<IProduct>,
  'product'
> & { product: number };

export type TInvoiceListResponse = StrapiResponse<TInvoiceDataResponse[]>;

export interface TInvoiceDetail extends Omit<TInvoice, 'customer'> {
  customer: { data: StrapiModel<ICustomer> };
  invoice_products: {
    data: StrapiModel<TInvoiceProduct<StrapiModel<IProduct>>>[];
  };
}

export type TInvoiceProductResponse = StrapiResponse<StrapiModel<IProduct>>;

export type TInvoiceDetailsResponse = StrapiResponse<
  StrapiModel<TInvoiceDetail>
>;

export type TInvoiceProductTable = TInvoiceProduct<IProduct & { id: number }>;

export type TInvoiceFormData = {
  invoiceId: string;
  date: string;
  imageUrl: string;
  customerId: string;
  status: InvoiceStatus;
  address: string;
  email: string;
  invoice_products: number[];
};

export type TRecentInvoiceProductResponse = StrapiResponse<
  StrapiModel<TInvoiceProduct<StrapiModel<IProduct>>>[]
>;
