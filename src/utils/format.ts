import { CalendarDate, DateValue } from '@nextui-org/react';
import { CalendarDateTime, ZonedDateTime } from '@internationalized/date';
import dayjs from 'dayjs';

// Types
import { StrapiModel, TProductInvoiceResponse } from '@/types';

// Models
import { IEvent, IProduct, TInvoiceProduct } from '@/models';

// Constants
import { REGEX } from '@/constants';

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
  const phone = value.replace(/[()\\-]/g, ' ');

  if (phone) return `+${phone}`;

  return '';
};

export const clearPhoneNumberFormat = (value: string): string =>
  value.replace(REGEX.NOT_NUMBER, '').substring(0, 10);

export const formatPhoneNumberTyping: (value: string) => string = (
  value: string,
): string => {
  if (!value) return value;
  const clearedValue = clearPhoneNumberFormat(value);

  const phoneNumberLength = clearedValue.length;

  if (phoneNumberLength < 4) return clearedValue;
  if (phoneNumberLength < 7)
    return `(${clearedValue.slice(0, 3)}) ${clearedValue.slice(3)}`;

  return `(${clearedValue.slice(0, 3)}) ${clearedValue.slice(3, 6)}-${clearedValue.slice(6)}`;
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

export const formatDatePicker = (
  date: CalendarDate | CalendarDateTime | ZonedDateTime,
) => {
  // Pad the month and day with a leading zero if they are single digits
  const formattedMonth = String(date.month).padStart(2, '0');
  const formattedDay = String(date.day).padStart(2, '0');
  const formattedYear = String(date.year);

  return `${formattedYear}-${formattedMonth}-${formattedDay}`;
};

export const formatPriceTyping = (value: string) => {
  // Check for an empty or undefined value, set to default '0' if so
  if (value === '') {
    return '';
  }
  // Remove all non-numeric characters except the dot
  const numericValue = value.replace(/[^0-9.]/g, '');

  // Format the numeric value with commas for thousands
  const parts = numericValue.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Join back the integer and decimal parts
  return `$${parts.join('.')}`;
};

/**
 * Aggregates product quantities by product ID.
 * @param {TProductInvoiceResponse[]} products - Array of products with attributes.
 * @returns {TProductInvoiceResponse[]} - Aggregated product quantities.
 */
export const aggregateProductQuantities = (
  products: TProductInvoiceResponse[],
): TProductInvoiceResponse[] => {
  const quantityByProductId: { [key: string]: TProductInvoiceResponse } = {};

  products.forEach((product) => {
    const productId = product.attributes.product.data.id;
    const quantity = product.attributes.quantity;

    // Check if the product ID exists in the results
    if (!quantityByProductId[productId]) {
      // If not, initialize the object for that ID
      quantityByProductId[productId] = {
        id: productId,
        attributes: {
          ...product.attributes,
          quantity: 0, // Initialize quantity
          product: { data: product.attributes.product.data }, // Keep product info
        },
      };
    }

    // Accumulate the quantity
    quantityByProductId[productId].attributes.quantity += quantity;
  });

  // Convert the object into an array and return
  return Object.values(quantityByProductId);
};

export const capitalizeFirstLetter = (value: string = '') => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const formattedEvents = (events: StrapiModel<IEvent>[]) =>
  events.map(({ attributes }) => ({
    ...attributes,
    start: dayjs(attributes.startTime).toDate(),
    end: dayjs(attributes.endTime).toDate(),
  })) as unknown as (Event & IEvent)[]; // TODO: Update type later;
