import { Module } from '@nestjs/common';
import { FakeService } from './fake.service';

@Module({
  providers: [FakeService],
})
export class FakeModule {
  constructor(private fakeService: FakeService) {
    this.fakeService.createFakeUser();
    this.fakeService.createFakeUrls();
  }
}
