import { PROCESS_ENV } from '@/constants';
import { uploadImage } from '../image';

describe('uploadImage', () => {
  const mockFile = new File(['test'], 'test.png', { type: 'image/png' });

  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('should upload image successfully', async () => {
    const mockResponse = { url: 'http://example.com/test.png' };
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const result = await uploadImage(mockFile);

    expect(fetch).toHaveBeenCalledWith(
      PROCESS_ENV.UPLOAD_URL,
      expect.objectContaining({
        method: 'POST',
        body: expect.any(FormData),
        headers: {
          'API-Key': PROCESS_ENV.UPLOAD_KEY,
        },
      }),
    );
    expect(result).toEqual(mockResponse);
  });

  it('should handle upload image failure', async () => {
    const mockError = new Error('Upload failed');
    (fetch as jest.Mock).mockRejectedValueOnce(mockError);

    const result = await uploadImage(mockFile);

    expect(fetch).toHaveBeenCalledWith(
      PROCESS_ENV.UPLOAD_URL,
      expect.objectContaining({
        method: 'POST',
        body: expect.any(FormData),
        headers: {
          'API-Key': PROCESS_ENV.UPLOAD_KEY,
        },
      }),
    );
    expect(result).toEqual({ error: 'Error: Upload failed' });
  });

  it('should handle unknown error', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(undefined);

    const result = await uploadImage(mockFile);

    expect(fetch).toHaveBeenCalledWith(
      PROCESS_ENV.UPLOAD_URL,
      expect.objectContaining({
        method: 'POST',
        body: expect.any(FormData),
        headers: {
          'API-Key': PROCESS_ENV.UPLOAD_KEY,
        },
      }),
    );
    expect(result).toEqual({ error: 'Error: Unknown error' });
  });
});
