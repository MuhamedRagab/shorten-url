import { User } from '@prisma/client';

export const fakeUser: User = {
  id: 'd2da469e-752d-47c4-bce1-153857a7fa6d',
  email: 'test123@gmail.com',
  fullName: 'Test 1',
  password: '123456aA@',
  username: 'test1',
  createdAt: new Date(),
  updatedAt: new Date(),
};
