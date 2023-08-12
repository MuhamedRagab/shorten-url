import { Url } from '@prisma/client';

export const fakeUrls: Url[] = [
  {
    id: 'd2da469e-752d-47c4-bce1-153857a7fa6d',
    url: 'https://www.google.com',
    shortUrl: '5fd5a',
    userId: 'd2da469e-752d-47c4-bce1-153857a7fa6d',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'd2da469e-752d-47c4-bce1-153857a7fas',
    url: 'https://www.facebook.com',
    shortUrl: '58dxa',
    userId: 'd2da469e-752d-47c4-bce1-153857a7fa6d',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'd2da469e-752d-47c4-bce1-153857a7d',
    url: 'https://www.youtube.com',
    shortUrl: '84d5a',
    userId: 'd2da469e-752d-47c4-bce1-153857a7fa6d',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
