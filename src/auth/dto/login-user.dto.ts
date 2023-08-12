import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    default: 'test123@gmail.com',
    description: 'email of the user',
    required: true,
    uniqueItems: true,
  })
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    default: '123456aA@',
    description: 'password of the user',
    required: true,
  })
  @IsNotEmpty()
  readonly password: string;
}
