export const enum ROLE {
  ADMIN = 'admin',
  NORMAL_USER = 'user',
}

export interface User {
  role: ROLE;
  token: string;
}
