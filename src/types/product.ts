// Models
import {
  IProduct,
  IProductDetail,
  TInvoiceProduct,
  TInvoiceProductWithTotalSale,
} from '@/models';

// Types
import { StrapiModel, StrapiResponse } from '@/types';

export type TProductDataResponse = StrapiModel<IProduct>;

export type TProductListResponse = StrapiResponse<TProductDataResponse[]>;

export type TProductInvoiceResponse = StrapiModel<
  TInvoiceProduct<StrapiModel<IProductDetail>>
>;

export type TProductInvoiceWithTotalSaleResponse = StrapiModel<
  TInvoiceProductWithTotalSale<StrapiModel<IProductDetail>>
>;

export type TProductInvoiceListResponse = StrapiResponse<
  StrapiModel<TInvoiceProduct<StrapiModel<IProductDetail>>>[]
>;
