// Components
import { MedalIcon, Text } from '@/components';

// Types
import { TProductInvoiceWithTotalSaleResponse } from '@/types';

/**
 * Returns a MedalIcon if the product is among the top three items,
 * otherwise returns the product's index in the list as a Text component.
 * @param data Array of product data items
 * @param itemData The product data item for which to get the serial number or medal
 * @returns MedalIcon if in the top three, otherwise a Text component with the serial number
 */
export const getSerialNumberWithMedal = <T extends { id: number }>(
  data: T[],
  itemData: T,
) => {
  const index = data.findIndex((item) => item.id === itemData.id) + 1;

  const topThreeSelling = index <= 3;

  return topThreeSelling ? (
    <MedalIcon />
  ) : (
    <Text size="md" text={String(index)} className="text-nowrap" />
  );
};

/**
 * Sorts an array of products by their total sale in descending order.
 * @param products Array of product data
 * @returns Sorted products by total sale
 */
export const sortByTotalSaleDescending = (
  products: TProductInvoiceWithTotalSaleResponse[],
) =>
  products.sort(
    (a, b) => (b.attributes.totalSale ?? 0) - (a.attributes.totalSale ?? 0),
  );

/**
 *
 * Get data by ID
 *
 * @param data - Array of data
 * @param id - id of data
 * @returns - an object in data by id
 */
export const getDataByID = <T extends { id: number }>(
  data: T[],
  id: number,
): T => {
  const item = data.find((item: T) => item.id === id);

  if (!item) {
    throw new Error(`Item with ID ${id} not found`);
  }

  return item;
};
