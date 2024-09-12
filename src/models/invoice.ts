export type TInvoiceProduct<T> = {
  price: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  quantity: number;
  product: { data: T };
};
