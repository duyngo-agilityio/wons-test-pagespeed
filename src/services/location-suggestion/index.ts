import { NextRequest } from 'next/server';

// Constants
import {
  API_PATH,
  MESSAGES,
  PROCESS_ENV,
  SEARCH_QUERIES,
  STATUS_CODE,
} from '@/constants';

// Utils
import { formatQuery } from '@/utils';

export const getLocationSuggestion = async (keyword: string) => {
  const locationRequest = await fetch(
    `${API_PATH.LOCATION_SUGGESTION}?location=${keyword}`,
  );

  if (!locationRequest?.ok) {
    throw new Error(locationRequest?.statusText);
  }

  const locationResponse = await locationRequest.json();

  return locationResponse;
};

export const getLocationRequest = async (request: NextRequest) => {
  const searchParams = request.nextUrl?.searchParams;

  const locationValue = searchParams.get(SEARCH_QUERIES.LOCATION);

  if (!locationValue) {
    return new Response(MESSAGES.LOCATION, {
      status: STATUS_CODE.INVALID_PARAM,
    });
  }
  const dataQuery = {
    text: locationValue,
    apiKey: PROCESS_ENV.API_LOCATION_KEY,
  };
  const locationRequest = await fetch(
    `${PROCESS_ENV.API_LOCATION_URL}?${formatQuery(dataQuery)}`,
  );

  const locationResponse = await locationRequest.json();

  return locationResponse;
};
