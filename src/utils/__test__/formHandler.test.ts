// Unit tests for: handleUpdateImage

import { uploadImage } from '@/api';
import { handleUpdateImage } from '../formHandler';

// handleUpdateImage.test.ts
jest.mock('@/api', () => ({
  uploadImage: jest.fn(),
}));

describe('handleUpdateImage() handleUpdateImage method', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Happy Path', () => {
    it('should return a URL when uploadImage returns a downloadURL', async () => {
      // Arrange: Mock the uploadImage function to return a successful response
      const mockFile = new File(['avatar'], 'avatar.png', {
        type: 'image/png',
      });
      const mockResponse = { downloadURL: 'http://example.com/avatar.png' };
      (uploadImage as jest.Mock).mockResolvedValue(mockResponse);

      // Act: Call the handleUpdateImage function
      const result = await handleUpdateImage(mockFile);

      // Assert: Verify the result contains the expected URL
      expect(result).toEqual({ url: 'http://example.com/avatar.png' });
      expect(uploadImage).toHaveBeenCalledWith(mockFile);
    });
  });

  describe('Edge Cases', () => {
    it('should return an error when uploadImage returns an error', async () => {
      // Arrange: Mock the uploadImage function to return an error response
      const mockFile = new File(['avatar'], 'avatar.png', {
        type: 'image/png',
      });
      const mockErrorResponse = { error: 'Upload failed' };
      (uploadImage as jest.Mock).mockResolvedValue(mockErrorResponse);

      // Act: Call the handleUpdateImage function
      const result = await handleUpdateImage(mockFile);

      // Assert: Verify the result contains the expected error message
      expect(result).toEqual({ error: 'Upload failed' });
      expect(uploadImage).toHaveBeenCalledWith(mockFile);
    });

    it('should handle a case where uploadImage returns an empty object', async () => {
      // Arrange: Mock the uploadImage function to return an empty object
      const mockFile = new File(['avatar'], 'avatar.png', {
        type: 'image/png',
      });
      (uploadImage as jest.Mock).mockResolvedValue({});

      // Act: Call the handleUpdateImage function
      const result = await handleUpdateImage(mockFile);

      // Assert: Verify the result contains an undefined error
      expect(result).toEqual({ error: undefined });
      expect(uploadImage).toHaveBeenCalledWith(mockFile);
    });
  });
});
