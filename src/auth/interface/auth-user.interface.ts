import { UserEntity } from 'src/entities/user.entity';

export interface UserWithToken extends UserEntity {
  token: string;
}
