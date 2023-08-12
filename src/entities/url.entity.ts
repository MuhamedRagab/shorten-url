import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { randomUUID } from 'crypto';

const dateFormatted = () =>
  new Date().toISOString().slice(0, 19).replace('T', ' ');

@Entity({ name: 'url' })
export class UrlEntity {
  @PrimaryColumn({
    type: 'uuid',
    name: 'id',
    unique: true,
    default: randomUUID(),
  })
  readonly id: string;

  @Column({
    type: 'varchar',
    name: 'url',
  })
  readonly url: string;

  @Column({
    type: 'varchar',
    name: 'shortUrl',
    default: randomUUID().slice(0, 5),
  })
  readonly shortUrl: string;

  @Column({
    type: 'uuid',
    name: 'userId',
  })
  readonly userId: string;

  @Column({
    type: 'date',
    name: 'createdAt',
    default: dateFormatted(),
  })
  readonly createdAt?: Date;

  @Column({
    type: 'date',
    name: 'updatedAt',
    default: dateFormatted(),
  })
  readonly updatedAt?: Date;

  @ManyToOne(() => UserEntity, (user) => user.urls)
  user: UserEntity;
}
