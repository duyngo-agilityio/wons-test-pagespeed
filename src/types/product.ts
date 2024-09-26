// Models
import { IProduct } from '@/models';

// Types
import { StrapiModel, StrapiResponse } from '@/types';

export type TProductDataResponse = StrapiModel<IProduct>;

export type TProductListResponse = StrapiResponse<TProductDataResponse[]>;
