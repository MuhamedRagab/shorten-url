import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUrlDto } from './dto/create-url.dto';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Url } from '@prisma/client';

@Injectable()
export class UrlService {
  constructor(private prisma: PrismaService) {}

  async findUserUrls(userId: string): Promise<Url[] | []> {
    const urls = await this.prisma.url.findMany({ where: { userId } });

    if (urls.length === 0) {
      throw new BadRequestException('Urls not found', {
        description: `Urls for user with id ${userId} not found`,
      });
    }

    return urls;
  }

  async createUrl({ url, userId }: CreateUrlDto): Promise<Url> {
    const userExist = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!userExist) {
      throw new BadRequestException('User not found.', {
        description: `User with id ${userId} not found`,
      });
    }

    const isUrlExist = await this.prisma.url.findFirst({
      where: { url, userId },
    });

    if (isUrlExist) {
      throw new BadRequestException('Url already exist', {
        description: `${url} already exist and shortened to ${isUrlExist.shortUrl}`,
      });
    }

    const shortUrl = await this.getUniqueShortUrl(userId);
    const newUrl = await this.prisma.url.create({
      data: {
        url,
        userId,
        id: randomUUID(),
        shortUrl,
      },
    });

    return newUrl;
  }

  private async getUniqueShortUrl(userId: string) {
    const shortUrl = randomUUID().slice(0, 5);
    const isShortUrlExist = await this.prisma.url.findFirst({
      where: { shortUrl, userId },
    });

    if (isShortUrlExist) {
      return this.getUniqueShortUrl(userId);
    }

    return shortUrl;
  }

  async deleteUrl(id: string): Promise<Url> {
    const url = await this.prisma.url.findFirst({ where: { id } });

    if (!url) {
      throw new BadRequestException('Url not found', {
        description: `Url with id ${id} not found`,
      });
    }
    await this.prisma.url.delete({ where: { id } });

    return url;
  }
}
