import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateUrlDto {
  @ApiProperty({
    default: 'https://www.google.com',
    description: 'url of the user',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  readonly url: string;

  @ApiProperty({
    default: 'test123',
    description: 'userId of the user',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  readonly userId: string;

  @ApiProperty({
    default: 'test123',
    description: 'shortUrl of the user',
    required: true,
  })
  @IsNotEmpty()
  @IsOptional()
  @IsDate()
  readonly createdAt: string;

  @ApiProperty({
    default: 'test123',
    description: 'shortUrl of the user',
    required: true,
  })
  @IsNotEmpty()
  @IsOptional()
  @IsDate()
  readonly updatedAt: string;
}
