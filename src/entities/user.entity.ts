import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { UrlEntity } from './url.entity';
import { randomUUID } from 'crypto';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryColumn({
    type: 'uuid',
    name: 'id',
    unique: true,
    default: randomUUID(),
  })
  readonly id: string;

  @Column({
    type: 'varchar',
    name: 'username',
    unique: true,
  })
  readonly username: string;

  @Column({
    type: 'varchar',
    name: 'email',
    unique: true,
  })
  readonly email: string;

  @Column({
    type: 'varchar',
    name: 'fullName',
  })
  readonly fullName: string;

  @Column({
    type: 'varchar',
    name: 'password',
  })
  password: string;

  @OneToMany(() => UrlEntity, (url) => url.user, { cascade: true })
  urls: UrlEntity[];
}
