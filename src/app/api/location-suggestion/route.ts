import { NextRequest, NextResponse } from 'next/server';

// Services
import { getLocationRequest } from '@/services';

export const GET = async (request: NextRequest) => {
  const locationResponse = await getLocationRequest(request);

  return NextResponse.json(locationResponse);
};
