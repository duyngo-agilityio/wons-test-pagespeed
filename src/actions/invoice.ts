'use server';

import { revalidateTag } from 'next/cache';

// APIs
import { uploadImage } from '@/api/image';

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
} from '@/types';

export const createInvoiceProducts = async (
  products: TInvoiceProduct<IProduct & { id: number }>[],
): Promise<number[]> => {
  try {
    const res = await Promise.all(
      products.map(async ({ product, quantity, price }) => {
        const productData = {
          price,
          quantity: Number(quantity),
          product: product.data.id,
        };

        const { data } = await httpClient.postRequest<
          { data: TInvoiceProductRequest },
          TInvoiceProductResponse
        >({
          endpoint: API_PATH.INVOICE_PRODUCTS,
          body: { data: productData },
        });

        return data.id;
      }),
    );

    return res;
  } catch (error) {
    const message = formatErrorMessage(error);
    throw new Error(message);
  }
};

export const createInvoice = async (
  formData: Partial<TInvoice>,
  products: TInvoiceProduct<IProduct & { id: number }>[],
) => {
  try {
    if (formData.imageUrl) {
      const imageFormData = new FormData();
      imageFormData.append('image', formData.imageUrl);
      const imageUrl = await uploadImage(imageFormData);

      if (typeof imageUrl === 'string') {
        formData.imageUrl = imageUrl;
      } else {
        return { error: imageUrl.error };
      }
    }

    const resProducts = await createInvoiceProducts(products);

    const formattedInvoiceData = {
      ...formData,
      customer: Number(formData.customerId),
      isSelected: false,
      invoice_products: resProducts,
    };

    const res = await httpClient.postRequest<
      { data: Partial<TInvoiceFormData> },
      TInvoiceDetailsResponse
    >({
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
  newProducts: number[],
) => {
  try {
    const data = {
      ...newData,
      customer: Number(newData.customerId),
      invoice_products: newProducts,
    };

    const res = await httpClient.putRequest<
      { data: Partial<TInvoiceFormData> },
      TInvoiceDetailsResponse
    >({
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
    await httpClient.putRequest({
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
  id: number,
): Promise<{ error?: string } | void> => {
  try {
    await httpClient.deleteRequest({
      endpoint: `${API_PATH.INVOICES}/${id}`,
    });

    revalidateTag(API_PATH.INVOICES);
  } catch (error) {
    const message = formatErrorMessage(error);

    return { error: message };
  }
};

export const deleteMultipleInvoice = async (
  ids: number[],
): Promise<{ error?: string } | void> => {
  try {
    await Promise.all(
      ids.map((id) =>
        httpClient.deleteRequest({
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
