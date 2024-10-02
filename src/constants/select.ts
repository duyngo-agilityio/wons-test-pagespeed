import { IFilter } from '@/types';

export const INVOICE_STATUS = [
  {
    label: 'Complete',
    value: 'complete',
  },
  {
    label: 'Pending',
    value: 'pending',
  },
  {
    label: 'Cancel',
    value: 'cancel',
  },
];

export const FILTER_OPTIONS: IFilter[] = [
  {
    id: 'list_1',
    title: 'User',
    items: [
      {
        id: 'user_1',
        content: 'Anna Lina',
      },
      {
        id: 'user_2',
        content: 'Leanne Graham',
      },
      {
        id: 'user_3',
        content: 'Ervin Howell',
      },
      {
        id: 'user_4',
        content: 'Clementine Bauch',
      },
      {
        id: 'user_5',
        content: 'Patricia Lebsack',
      },
    ],
  },
];
