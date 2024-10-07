'use server';

import { revalidateTag } from 'next/cache';

// constants
import { API_PATH } from '@/constants';

// models
import { IProductDetail } from '@/models';

// services
import { httpClient } from '@/services';

// utils
import { formatErrorMessage } from '@/utils';
import { TProductInvoiceListResponse } from '@/types';

export const createProduct = async (formData: Partial<IProductDetail>) => {
  try {
    const formattedData = {
      ...formData,
      title: `${formData.title}`,
    };

    await httpClient.postRequest({
      endpoint: API_PATH.PRODUCTS,
      body: { data: formattedData },
    });

    revalidateTag(API_PATH.PRODUCTS);

    return { success: true };
  } catch (error) {
    const message = formatErrorMessage(error);
    return { error: message };
  }
};

export const updateProduct = async (
  formData: Partial<IProductDetail>,
  id: number,
) => {
  try {
    const formattedData = {
      ...formData,
      title: `${formData.title}`,
    };

    await httpClient.putRequest({
      endpoint: `${API_PATH.PRODUCTS}/${id}`,
      body: { data: formattedData },
    });

    revalidateTag(API_PATH.PRODUCTS);

    return { success: true };
  } catch (error) {
    const message = formatErrorMessage(error);
    return { error: message };
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const { data: responseInvoiceProducts }: TProductInvoiceListResponse =
      await httpClient.getRequest({
        endpoint: `${API_PATH.INVOICE_PRODUCTS}?filters[product][$eq]=${id}`,
      });

    const queryString = responseInvoiceProducts
      .map(
        (item, index) =>
          `filters[$or][${index}][invoice_products][id]=${item.id}`,
      )
      .join('&');

    responseInvoiceProducts.map(async (invoice) => {
      return await httpClient.deleteRequest({
        endpoint: `${API_PATH.INVOICE_PRODUCTS}/${invoice.id}`,
      });
    });

    if (queryString) {
      const responseInvoices: TProductInvoiceListResponse =
        await httpClient.getRequest({
          endpoint: `${API_PATH.INVOICES}?${queryString}`,
        });

      responseInvoices.data.map(async (invoice) => {
        await httpClient.deleteRequest({
          endpoint: `${API_PATH.INVOICES}/${invoice.id}`,
        });
      });
    }

    await httpClient.deleteRequest({
      endpoint: `${API_PATH.PRODUCTS}/${id}`,
    });

    revalidateTag(API_PATH.INVOICE_PRODUCTS);
    revalidateTag(API_PATH.INVOICES);
    revalidateTag(API_PATH.PRODUCTS);

    return { success: true };
  } catch (error) {
    const message = formatErrorMessage(error);

    return { error: message };
  }
};
