// Constants
import { API_BASE_URL } from '@/constants';

// Types
import { Method } from '@/types';

type TRequest = {
  endpoint: string;
  configOptions?: RequestInit;
};

type TGenericRequest<T> = TRequest & {
  method: Method;
  body?: T;
};

class HttpClient {
  private baseApi: string;

  constructor(baseUrl: string) {
    this.baseApi = baseUrl;
  }

  async request<T>({ endpoint, configOptions }: TRequest): Promise<T> {
    const res = await fetch(this.baseApi + endpoint, configOptions);

    if (!res?.ok) {
      const errorData = await res.json();

      throw errorData;
    }

    const contentType = res.headers.get('Content-Type') || '';

    let result: T;

    if (contentType.includes('application/json')) {
      result = await res.json();
    } else {
      result = (await res.text()) as unknown as T;
    }

    return result;
  }

  async getRequest<T>({ endpoint, configOptions }: TRequest): Promise<T> {
    const options: RequestInit = {
      method: Method.Get,
      ...configOptions,
    };

    return this.request<T>({ endpoint, configOptions: options });
  }

  async genericRequest<T, K>({
    method,
    endpoint,
    body,
    configOptions,
  }: TGenericRequest<T>): Promise<K> {
    const options: RequestInit = {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      ...configOptions,
    };

    return this.request<K>({ endpoint, configOptions: options });
  }
}

export const httpClient = new HttpClient(API_BASE_URL);
