export type TInvoiceProduct<T> = {
  price: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  quantity: number;
  product: { data: T };
};

export enum InvoiceStatus {
  COMPLETE = 'complete',
  PENDING = 'pending',
  CANCEL = 'cancel',
}

export interface IInvoice {
  id: string;
  customer: string;
  imageUrl: string;
  status: InvoiceStatus;
  address: string;
  isSelected: boolean;
  date: string;
  email: string;
}
