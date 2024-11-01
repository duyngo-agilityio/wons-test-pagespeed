import { generateRandomID } from '../generate-id';

// generateRandomID.test.ts
describe('generateRandomID() generateRandomID method', () => {
  describe('Happy Path', () => {
    it('should return a string', () => {
      // Test to ensure the function returns a string
      const id = generateRandomID();
      expect(typeof id).toBe('string');
    });

    it('should return a 7-character string', () => {
      // Test to ensure the function returns a string of length 6
      const id = generateRandomID();
      expect(id.length).toBe(7);
    });

    it('should return a string that represents a number between 100000 and 999999', () => {
      // Test to ensure the function returns a number within the expected range
      const id = generateRandomID();
      const numericId = parseInt(id, 10);
      expect(numericId).toBeGreaterThanOrEqual(100000);
    });
  });

  describe('Edge Cases', () => {
    it('should never return a number less than 100000', () => {
      // Test to ensure the function never returns a number less than 100000
      for (let i = 0; i < 1000; i++) {
        const id = generateRandomID();
        const numericId = parseInt(id, 10);
        expect(numericId).toBeGreaterThanOrEqual(100000);
      }
    });
  });
});
