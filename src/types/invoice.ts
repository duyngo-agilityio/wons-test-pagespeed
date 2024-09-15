// Types
import { StrapiModel, StrapiResponse } from '@/types';

// Models
import { ICustomer, TInvoice } from '@/models';

export type TInvoiceDataResponse = StrapiModel<
  TInvoice & { customer: { data: StrapiModel<ICustomer> } }
>;

export type TInvoiceListResponse = StrapiResponse<TInvoiceDataResponse[]>;
