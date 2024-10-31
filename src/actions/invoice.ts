'use server';

import { revalidateTag } from 'next/cache';

// Constants
import { API_PATH } from '@/constants';

// Models
import { IProduct, TInvoice, TInvoiceProduct } from '@/models';

// Services
import { httpClient } from '@/services';

// Utils
import { formatErrorMessage } from '@/utils';

// Types
import {
  TInvoiceDetailsResponse,
  TInvoiceFormData,
  TInvoiceProductRequest,
  TInvoiceProductResponse,
  TInvoiceProductTable,
  Method,
} from '@/types';

export const createInvoiceProducts = async (
  products: TInvoiceProductTable[],
): Promise<number[]> => {
  try {
    const res = await Promise.all(
      products.map(async ({ product, quantity = 0, price = 0 }) => {
        const productData = {
          price,
          quantity: Number(quantity),
          product: product.data.id,
        };

        const { data } = await httpClient.genericRequest<
          { data: TInvoiceProductRequest },
          TInvoiceProductResponse
        >({
          method: Method.Post,
          endpoint: API_PATH.INVOICE_PRODUCTS,
          body: { data: productData },
        });

        return data?.id;
      }),
    );

    return res;
  } catch (error) {
    const message = formatErrorMessage(error);
    throw new Error(message);
  }
};

export const updateInvoiceProducts = async (
  products: TInvoiceProductTable[],
): Promise<number[]> => {
  try {
    const res = await Promise.all(
      products.map(async ({ product, quantity = 0, price = 0, id }) => {
        const productData = {
          price,
          quantity: Number(quantity),
          product: product.data.id,
          id,
        };

        const { data } = await httpClient.genericRequest<
          { data: TInvoiceProductRequest },
          TInvoiceProductResponse
        >({
          method: Method.Put,
          endpoint: `${API_PATH.INVOICE_PRODUCTS}/${productData.id}`,
          body: { data: productData },
        });

        return data?.id;
      }),
    );

    return res;
  } catch (error) {
    const message = formatErrorMessage(error);
    throw new Error(message);
  }
};

export const deleteInvoiceProducts = async (
  ids: number[],
): Promise<{ error?: string } | void> => {
  try {
    await Promise.all(
      ids.map((id) =>
        httpClient.genericRequest({
          method: Method.Delete,
          endpoint: `${API_PATH.INVOICE_PRODUCTS}/${id}`,
        }),
      ),
    );

    revalidateTag(API_PATH.INVOICE_PRODUCTS);
  } catch (error) {
    const message = formatErrorMessage(error);

    return { error: message };
  }
};

export const createInvoice = async (
  formData: Partial<TInvoice>,
  products: TInvoiceProduct<IProduct & { id: number }>[],
) => {
  try {
    const resProducts = await createInvoiceProducts(products);

    const formattedInvoiceData = {
      ...formData,
      customer: Number(formData.customerId),
      isSelected: false,
      invoice_products: resProducts,
    };

    const res = await httpClient.genericRequest<
      { data: Partial<TInvoiceFormData> },
      TInvoiceDetailsResponse
    >({
      method: Method.Post,
      endpoint: API_PATH.INVOICES,
      body: { data: formattedInvoiceData },
    });

    revalidateTag(API_PATH.INVOICES);
    revalidateTag(API_PATH.INVOICE);

    return { data: res.data || {} };
  } catch (error) {
    const message = formatErrorMessage(error);
    return { error: message };
  }
};

export const editInvoice = async (
  id: number,
  newData: Partial<TInvoice>,
  newProductsInvoice: TInvoiceProductTable[],
) => {
  try {
    const prevProducts = newProductsInvoice.filter((product) =>
      Object.prototype.hasOwnProperty.call(product, 'id'),
    );

    const newProducts = newProductsInvoice.filter(
      (product) => !Object.prototype.hasOwnProperty.call(product, 'id'),
    );

    const postNewInvoiceProducts = await createInvoiceProducts(newProducts);
    const updatePrevInvoiceProducts = await updateInvoiceProducts(prevProducts);

    const data = {
      ...newData,
      customer: Number(newData.customerId),
      invoice_products: postNewInvoiceProducts?.concat(
        updatePrevInvoiceProducts,
      ),
    };

    const res = await httpClient.genericRequest<
      { data: Partial<TInvoiceFormData> },
      TInvoiceDetailsResponse
    >({
      method: Method.Put,
      endpoint: `${API_PATH.INVOICES}/${id}`,
      body: { data },
    });

    revalidateTag(API_PATH.INVOICES);
    revalidateTag(API_PATH.INVOICE);

    return { data: res.data || {} };
  } catch (error) {
    const message = formatErrorMessage(error);
    return { error: message };
  }
};

export const updateInvoice = async (
  id: number,
  data: Partial<TInvoice>,
): Promise<{ error?: string } | void> => {
  try {
    await httpClient.genericRequest({
      method: Method.Put,
      endpoint: `${API_PATH.INVOICES}/${id}`,
      body: { data },
    });

    revalidateTag(API_PATH.INVOICES);
    revalidateTag(API_PATH.INVOICE);
  } catch (error) {
    const message = formatErrorMessage(error);
    return { error: message };
  }
};

export const deleteInvoice = async (
  invoiceId: number,
  invoiceProductIds: number[],
): Promise<{ error?: string } | void> => {
  try {
    // Delete invoice products
    await deleteInvoiceProducts(invoiceProductIds);

    // Delete an invoice
    await httpClient.genericRequest({
      method: Method.Delete,
      endpoint: `${API_PATH.INVOICES}/${invoiceId}`,
    });

    revalidateTag(API_PATH.INVOICES);
  } catch (error) {
    const message = formatErrorMessage(error);

    return { error: message };
  }
};

export const deleteMultipleInvoice = async (
  invoiceIds: number[],
  invoiceProductIds: number[],
): Promise<{ error?: string } | void> => {
  try {
    // Delete invoice products
    await deleteInvoiceProducts(invoiceProductIds);

    // Delete invoices
    await Promise.all(
      invoiceIds.map((id) =>
        httpClient.genericRequest({
          method: Method.Delete,
          endpoint: `${API_PATH.INVOICES}/${id}`,
        }),
      ),
    );

    revalidateTag(API_PATH.INVOICES);
  } catch (error) {
    const message = formatErrorMessage(error);

    return { error: message };
  }
};
