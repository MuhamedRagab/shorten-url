import { User } from '@prisma/client';

export interface UserWithToken extends User {
  token: string;
}
