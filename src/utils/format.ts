import { StrapiModel } from '@/types';

export const formatPrice = (price: number) => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;

  if (isNaN(numPrice) || !numPrice) return '';

  return numPrice?.toLocaleString('en-US');
};

export const formatTotalAmount = (price: number, quantity: number) =>
  formatPrice(price * quantity);

export const InsertSkeletonRow = (quantity: number) =>
  Array.from({ length: quantity }, (_, i) => ({ id: i + 1 }));

export const formattedResponseData = <T>(data: StrapiModel<T>[]) =>
  data.map((item) => {
    const { id, attributes } = item;

    return {
      id,
      ...attributes,
    };
  });
