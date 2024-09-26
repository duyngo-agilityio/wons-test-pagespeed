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

export const MOCK_PRODUCTS_WITHOUT_ATTRIBUTES: Omit<IProduct, 'id'>[] = [
  {
    title: 'Product 1',
    price: 100,
    rating: 5,
    imageUrl:
      'https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp',
  },
  {
    title: 'Product 2',
    price: 200,
    rating: 4,
    imageUrl:
      'https://img-cdn.pixlr.com/image-generator/history/another-product/medium.webp',
  },
  {
    title: 'Product 3',
    price: 300,
    rating: 4.5,
    imageUrl:
      'https://img-cdn.pixlr.com/image-generator/history/third-product/medium.webp',
  },
];

export const MOCK_PRODUCTS_TOP_SELLING = [
  {
    id: 1,
    attributes: {
      price: 1000,
      createdAt: '2024-08-27T04:20:56.562Z',
      updatedAt: '2024-09-23T02:52:07.552Z',
      publishedAt: '2024-09-10T04:14:24.732Z',
      rating: 4,
      title: 'I phone 12',
      imageUrl:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
      brand: 'Apple',
      negotiable: true,
      description:
        'This the New creation Of apple  This the New creation Of apple This the New creation Of apple This the New creation Of apple.',
    },
  },
  {
    id: 2,
    attributes: {
      price: 1200,
      createdAt: '2024-08-27T04:21:20.293Z',
      updatedAt: '2024-09-23T02:58:11.083Z',
      publishedAt: '2024-09-10T04:14:40.546Z',
      rating: 4,
      title: 'Macbook m1',
      imageUrl:
        'https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTExL3JtMzYyLTAxYS1tb2NrdXAuanBn.jpg',
      brand: 'Apple',
      negotiable: false,
      description:
        'This the New creation Of apple  This the New creation Of apple This the New creation Of apple This the New creation Of apple.',
    },
  },
  {
    id: 3,
    attributes: {
      price: 1000,
      createdAt: '2024-09-09T07:45:09.821Z',
      updatedAt: '2024-09-23T02:53:33.888Z',
      publishedAt: '2024-09-10T04:14:34.734Z',
      rating: 2,
      title: 'Samsung A13',
      imageUrl:
        'https://img.freepik.com/free-photo/organic-cosmetic-product-with-dreamy-aesthetic-fresh-background_23-2151382816.jpg',
      brand: 'Samsung',
      negotiable: true,
      description:
        "Discover Samsung's newest creation, combining innovation with cutting-edge technology. Experience the future with enhanced performance and sleek design.",
    },
  },
  {
    id: 4,
    attributes: {
      price: 1500,
      createdAt: '2024-09-09T07:45:45.847Z',
      updatedAt: '2024-09-23T02:54:18.198Z',
      publishedAt: '2024-09-10T04:14:46.763Z',
      rating: 4.6,
      title: 'Macbook pro m3',
      imageUrl:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
      brand: 'Apple',
      negotiable: false,
      description:
        'This the New creation Of apple  This the New creation Of apple This the New creation Of apple This the New creation Of apple.',
    },
  },
  {
    id: 5,
    attributes: {
      price: 3,
      createdAt: '2024-09-10T04:18:27.070Z',
      updatedAt: '2024-09-23T02:57:58.388Z',
      publishedAt: '2024-09-10T04:18:27.725Z',
      rating: 2,
      title: 'Samsung Laptop',
      imageUrl:
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D',
      brand: 'Samsung',
      negotiable: false,
      description:
        "Discover Samsung's newest creation, combining innovation with cutting-edge technology. Experience the future with enhanced performance and sleek design.",
    },
  },
];
