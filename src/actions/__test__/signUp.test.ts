import { waitFor } from '@testing-library/react';

// services
import { httpClient } from '@/services';

// utils
import { signUp } from '@/actions/auth';

// mocks
import {
  MOCK_SUCCESS_SIGN_UP_RES,
  SIGN_UP_FORM_DATA_MOCK,
  MOCK_ERROR_MESSAGES,
  MOCK_ERROR_RESPONSE,
} from '@/mocks';

jest.mock('@/utils', () => ({
  formatErrorMessage: jest.fn(),
}));

jest.mock('@/utils', () => ({
  formatErrorMessage: jest.fn(() => MOCK_ERROR_MESSAGES),
}));

describe('signUp', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should sign up a new account successfully', async () => {
    jest
      .spyOn(httpClient, 'genericRequest')
      .mockResolvedValue(MOCK_SUCCESS_SIGN_UP_RES);

    const user = await signUp(SIGN_UP_FORM_DATA_MOCK);

    waitFor(() => expect(user).toEqual(MOCK_SUCCESS_SIGN_UP_RES.data.user));
  });

  test('should sign up a new account failed', async () => {
    jest
      .spyOn(httpClient, 'genericRequest')
      .mockRejectedValue(MOCK_ERROR_RESPONSE);

    const res = await signUp(SIGN_UP_FORM_DATA_MOCK);

    expect(res?.error).toEqual(MOCK_ERROR_MESSAGES);
  });
});
