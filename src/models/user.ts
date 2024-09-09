export const enum ROLE {
  ADMIN = 'admin',
  NORMAL_USER = 'user',
}

export interface User {
  name: string;
  role: ROLE;
  token: string;
}
