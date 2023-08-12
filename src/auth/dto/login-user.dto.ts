import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  Length,
  IsEmail,
  IsStrongPassword,
} from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    default: 'test123@gmail.com',
    description: 'email of the user',
    required: true,
    uniqueItems: true,
  })
  @IsEmail(
    { domain_specific_validation: true },
    { message: 'email must be valid' },
  )
  @IsNotEmpty()
  readonly email: string;

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
