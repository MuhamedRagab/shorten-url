import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UrlEntity } from 'src/entities/url.entity';
import { Repository } from 'typeorm';
import { CreateUrlDto } from './dto/create-url.dto';
import { randomUUID } from 'crypto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(UrlEntity)
    private readonly urlRepository: Repository<UrlEntity>,
    private readonly userService: UserService,
  ) {}

  async findUserUrls(userId: string): Promise<UrlEntity[] | []> {
    const user = await this.userService.getUser({ id: userId });

    if (!user) {
      throw new BadRequestException('User not found.');
    }

    return await this.urlRepository.findBy({ userId });
  }

  async createUrl({ url, userId }: CreateUrlDto): Promise<UrlEntity> {
    const isUrlExist = await this.urlRepository.findOneBy({ url, userId });
    const isUserExist = await this.userService.getUser({ id: userId });

    if (!isUserExist) {
      throw new BadRequestException('User not found', {
        description: `User with id ${userId} not found`,
      });
    }

    if (isUrlExist) {
      throw new BadRequestException('Url already exist', {
        description: `${url} already exist and shortened to ${isUrlExist.shortUrl}`,
      });
    }

    const shortUrl = await this.getUniqueShortUrl(userId);
    const newUrl = await this.urlRepository.save({
      url,
      userId,
      id: randomUUID(),
      shortUrl,
    });

    return newUrl;
  }

  private async getUniqueShortUrl(userId: string) {
    const shortUrl = randomUUID().slice(0, 5);
    const isShortUrlExist = await this.urlRepository.findOneBy({
      shortUrl,
      userId,
    });

    if (isShortUrlExist) {
      return this.getUniqueShortUrl(userId);
    }

    return shortUrl;
  }

  async deleteUrl(id: string): Promise<UrlEntity> {
    const url = await this.urlRepository.findOneBy({ id });

    if (!url) {
      throw new BadRequestException('Url not found', {
        description: `Url with id ${id} not found`,
      });
    }
    await this.urlRepository.delete(id);

    return url;
  }
}
