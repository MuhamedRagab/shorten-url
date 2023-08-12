import { Injectable } from '@nestjs/common';
import { fakeUser } from './data/user.fake';
import { fakeUrls } from './data/urls.fake';
import { genSaltSync, hashSync } from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FakeService {
  constructor(private prisma: PrismaService) {}

  async createFakeUser(): Promise<void> {
    const userExist = await this.prisma.user.findUnique({
      where: { email: fakeUser.email },
    });

    if (userExist) return;

    const hashedPassword = hashSync(fakeUser.password, genSaltSync());
    fakeUser.password = hashedPassword;

    await this.prisma.user.create({ data: fakeUser });
  }

  async createFakeUrls(): Promise<void> {
    const urlsExist = await this.prisma.url.findMany();

    if (urlsExist.length > 0) return;

    await this.prisma.url.createMany({ data: fakeUrls });
  }
}
