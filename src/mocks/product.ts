// types
import { StrapiModel } from '@/types/strapi';

// models
import { IProduct } from '@/models';

export const mockProducts: StrapiModel<IProduct>[] = [
  {
    id: 1,
    attributes: {
      title: 'Product 1',
      price: 100,
      rating: 5,
      imageUrl:
        'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
    },
  },
  {
    id: 2,
    attributes: {
      title: 'Product 2',
      price: 200,
      rating: 4.5,
      imageUrl:
        'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
    },
  },
  {
    id: 3,
    attributes: {
      title: 'Product 3',
      price: 200,
      rating: 4.5,
      imageUrl:
        'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
    },
  },
];
