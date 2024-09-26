export const REGEX = {
  EMAIL: /[a-z0-9]+@[a-z]+\.[a-z]{2,4}/,
  PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,32})/,
  PHONE: /^\+?[0-9][0-9]{7,14}$/,
  IMG: /\.(png|jpg|webp)$/,
  INTEGER: /^-?\d*$/,
  NOT_NUMBER: /\D/g,
  PRICE_PRODUCT: /[^0-9.]/g,
};
