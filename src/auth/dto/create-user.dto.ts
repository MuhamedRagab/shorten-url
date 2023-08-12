import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  Length,
  IsEmail,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    default: 'test123',
    description: 'username of the user',
    required: true,
    uniqueItems: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  readonly username: string;

  @ApiProperty({
    default: 'test123@gmail.com',
    description: 'email of the user',
    required: true,
    uniqueItems: true,
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    default: 'test',
    description: 'full name of the user',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  readonly fullName: string;

  @ApiProperty({
    default: 'test123aA@',
    description: 'password of the user',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  @Length(3, 20)
  readonly password: string;
}
