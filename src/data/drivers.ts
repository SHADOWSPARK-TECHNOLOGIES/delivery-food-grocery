import type { Driver } from '@/types';

export const drivers: Driver[] = [
  { id: 'drv-001', name: 'Emeka Okafor', phone: '08031234567', vehicle: 'Yamaha bike · green box', rating: 4.9, zone: 'lagos-mainland' },
  { id: 'drv-002', name: 'Aisha Bello', phone: '08099887766', vehicle: 'Bajaj rickshaw · purple', rating: 4.8, zone: 'abuja' },
  { id: 'drv-003', name: 'Tunde Adeyemi', phone: '08055554433', vehicle: 'Honda bike · tricked', rating: 4.6, zone: 'port-harcourt' },
];

export const driverById = (id: string | undefined): Driver | undefined =>
  drivers.find((d) => d.id === id);

export const driverName = (id: string | undefined): string | undefined =>
  driverById(id)?.name;
