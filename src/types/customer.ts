// Models
import { ICustomer } from '@/models';

// Types
import { StrapiModel, StrapiResponse } from '@/types';

export type TCustomerDataResponse = StrapiModel<ICustomer>;

export type TCustomerListResponse = StrapiResponse<TCustomerDataResponse[]>;
