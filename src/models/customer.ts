type TGender = 'male' | 'female';

export interface ICustomer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: TGender;
  job: string;
  address: string;
  avatar: string;
}
