import type { CustomerProfile } from '@/types';

export const currentCustomer: CustomerProfile = {
  id: 'cus-demo-01',
  name: 'Ngozi Umeh',
  phone: '08030000000',
  email: 'ngozi@example.com',
  city: 'Lagos',
  zone: 'lagos-mainland',
};

export const customerById = (id: string): CustomerProfile | undefined =>
  id === currentCustomer.id ? currentCustomer : undefined;
