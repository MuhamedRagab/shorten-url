import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UrlEntity } from 'src/entities/url.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { fakeUser } from './data/user.fake';
import { fakeUrls } from './data/urls.fake';
import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class FakeService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(UrlEntity)
    private urlRepository: Repository<UrlEntity>,
  ) {}

  async createFakeUser(): Promise<void> {
    const hashedPassword = hashSync(fakeUser.password, genSaltSync());
    fakeUser.password = hashedPassword;

    await this.userRepository.save(fakeUser);
  }

  async createFakeUrls(): Promise<void> {
    for (const url of fakeUrls) {
      await this.urlRepository.save(url);
    }
  }
}
