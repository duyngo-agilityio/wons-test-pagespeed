export interface IProduct {
  imageUrl: string;
  title: string;
  price: number;
  rating: number;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  totalSale?: number;
}

export interface IProductDetail extends IProduct {
  id: number;
  brand: string;
  description: string;
  negotiable: boolean;
}
