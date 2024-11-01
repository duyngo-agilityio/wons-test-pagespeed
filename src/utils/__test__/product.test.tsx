// Components
import { MedalIcon } from '@/components';

// Utils
import {
  filterProductsNotInInvoice,
  getSerialNumberWithMedal,
  sortByTotalSaleDescending,
  sortProductsByTotalSale,
} from '../product';

// Types
import { TProductInvoiceWithTotalSaleResponse } from '@/types';

// Mocks
import { MOCK_INVOICE_PRODUCT_RESPONSE, mockProducts } from '@/mocks';

describe('getSerialNumberWithMedal', () => {
  it('returns MedalIcon for top three items', () => {
    const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const result = getSerialNumberWithMedal(data, { id: 1 });
    expect(result.type).toBe(MedalIcon);
  });
});

describe('sortByTotalSaleDescending', () => {
  it('sorts products by total sale in descending order', () => {
    const products = [
      { attributes: { totalSale: 100 } },
      { attributes: { totalSale: 300 } },
      { attributes: { totalSale: 200 } },
    ];
    const result = sortByTotalSaleDescending(
      products as TProductInvoiceWithTotalSaleResponse[],
    );
    expect(result).toEqual([
      { attributes: { totalSale: 300 } },
      { attributes: { totalSale: 200 } },
      { attributes: { totalSale: 100 } },
    ]);
  });
});

describe('sortProductsByTotalSale', () => {
  it('calculates total sale and sorts products by it', () => {
    const result = sortProductsByTotalSale(MOCK_INVOICE_PRODUCT_RESPONSE);
    expect(result[0].attributes.totalSale).toBe(12000);
    expect(result[1].attributes.totalSale).toBe(1200);
  });
});

describe.skip('filterProductsNotInInvoice', () => {
  it('filters products not in invoice', () => {
    const invoiceProductIds = new Set([1, 2]);
    const result = filterProductsNotInInvoice(invoiceProductIds, mockProducts);
    expect(result).toEqual([mockProducts[0], mockProducts[1]]);
  });
});
