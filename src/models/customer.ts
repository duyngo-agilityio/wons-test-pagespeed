type TGender = 'male' | 'female';

export interface ICustomer {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  gender: TGender;
  job: string;
  address: string;
  avatar: string;
}
