import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateUrlDto } from './dto/create-url.dto';
import { UrlService } from './url.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';

@ApiBearerAuth()
@ApiTags('Urls')
@Controller('urls')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Get(':userId')
  async findUserUrls(@Param('userId', ParseUUIDPipe) userId: string) {
    try {
      const userUrls = await this.urlService.findUserUrls(userId);

      return {
        status: HttpStatus.OK,
        data: userUrls,
      };
    } catch (error) {
      return {
        status: error.status,
        error: error.response,
      };
    }
  }

  @Post()
  async createUrl(@Body() url: CreateUrlDto) {
    try {
      const urlCreated = await this.urlService.createUrl(url);
      return {
        status: HttpStatus.CREATED,
        message: 'Url created successfully',
        data: urlCreated,
      };
    } catch (error) {
      return {
        status: error.status,
        error: error.response,
      };
    }
  }

  @Delete(':id')
  async deleteUrl(@Param('id') id: string) {
    try {
      await this.urlService.deleteUrl(id);

      return {
        status: HttpStatus.OK,
        message: 'Url deleted successfully',
      };
    } catch (error) {
      return {
        status: error.status,
        error: error.response,
      };
    }
  }
}
