// Types
import { StrapiModel } from '@/types';
import { DateValue } from '@nextui-org/react';

// Models
import { IProduct, TInvoiceProduct } from '@/models';

export const formatPrice = (price: number, isDigits: boolean = false) => {
  const numPrice = typeof price === 'string' ? parseFloat(price) : price;

  if (isNaN(numPrice) || !numPrice) return '';

  return numPrice?.toLocaleString(
    isDigits ? 'de-DE' : 'en-US',
    isDigits ? { minimumFractionDigits: 2 } : undefined,
  );
};

export const formatTotalAmount = (
  price: number,
  quantity: number,
  isDigits: boolean = false,
) => {
  if (isDigits) return formatPrice(price * quantity, true);

  return formatPrice(price * quantity);
};

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

export const formatPhoneNumber = (value: string) => {
  if (!value) {
    return '';
  }

  return value.replace(/[^0-9]/g, '');
};

/**
 *
 * @param products - the products from api
 * @returns - Calc the price of all products in the table
 *
 */
export const formatSubtotal = (
  items: { data: StrapiModel<TInvoiceProduct<StrapiModel<IProduct>>>[] },
  discount: number = 0,
) => {
  const subtotal = items.data.reduce(
    (prevResult, item) =>
      prevResult + item.attributes.price * item.attributes.quantity,
    0,
  );
  const subtotalWithDiscount = subtotal * (discount / 100);

  if (discount) return `${formatPrice(subtotalWithDiscount, true)} USD`;

  return `${formatPrice(subtotal, true)} USD`;
};

export const formatAmountWithDiscount = (
  items: { data: StrapiModel<TInvoiceProduct<StrapiModel<IProduct>>>[] },
  discount: number = 0,
) => {
  const subtotal = items.data.reduce(
    (prevResult, item) =>
      prevResult + item.attributes.price * item.attributes.quantity,
    0,
  );
  const subtotalWithDiscount = subtotal * (discount / 100);
  const total = subtotal - subtotalWithDiscount;

  return `${formatPrice(total, true)} USD`;
};
export const formatDateString = (date: DateValue) =>
  `${date.year}-${date.month}-${date.day}`;
