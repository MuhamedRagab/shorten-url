import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    default: 'test123@gmail.com',
    description: 'email of the user',
    required: true,
    uniqueItems: true,
  })
  readonly email: string;

  @ApiProperty({
    default: '123456aA@',
    description: 'password of the user',
    required: true,
  })
  readonly password: string;
}
