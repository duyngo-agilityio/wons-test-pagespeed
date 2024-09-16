/**
 * Function to generate a random 4-character ID
 */
export const generateRandomID = () =>
  Math.floor(100000 + Math.random() * 900000).toString();
