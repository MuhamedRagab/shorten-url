import { Module } from '@nestjs/common';
import { FakeService } from './fake.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlEntity } from 'src/entities/url.entity';
import { UserEntity } from 'src/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UrlEntity, UserEntity])],
  providers: [FakeService],
})
export class FakeModule {
  constructor(private fakeService: FakeService) {
    this.fakeService.createFakeUser();
    this.fakeService.createFakeUrls();
  }
}
