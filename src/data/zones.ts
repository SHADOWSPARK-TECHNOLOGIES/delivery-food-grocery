import type { DeliveryZone } from '@/types';

export const deliveryZones: DeliveryZone[] = [
  {
    id: 'lagos-mainland',
    name: 'Lagos Mainland',
    city: 'Lagos',
    description: 'Yaba, Surulere, Ikeja, Yaba and environs',
  },
  {
    id: 'lagos-island',
    name: 'Lagos Island',
    city: 'Lagos',
    description: 'Victoria Island, Lekki, Ikoyi, Marina',
  },
  {
    id: 'abuja',
    name: 'Abuja',
    city: 'Abuja',
    description: 'Wuse, Garki, Maitama, Asokoro',
  },
  {
    id: 'port-harcourt',
    name: 'Port Harcourt',
    city: 'Port Harcourt',
    description: 'GRA, Trans Amadi, Obiri, Rumuokwuta',
  },
];

export const zoneById = (id: string): DeliveryZone | undefined =>
  deliveryZones.find((z) => z.id === id);

export const zoneName = (id: string): string => zoneById(id)?.name ?? id;
