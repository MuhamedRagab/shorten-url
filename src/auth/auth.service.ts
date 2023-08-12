import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { randomUUID } from 'crypto';
import { UserService } from 'src/user/user.service';
import { UserWithToken } from './interface/auth-user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(user: CreateUserDto): Promise<UserWithToken> {
    const userExists = await this.userService.getUser({ email: user.email });

    if (userExists) {
      throw new BadRequestException('User already exists.');
    }

    const hashedPassword = hashSync(user.password, genSaltSync());
    const userToCreate = {
      ...user,
      id: randomUUID(),
      password: hashedPassword,
    };

    const userCreated = await this.userService.createUser(userToCreate);
    delete userCreated.password;

    return this.getUserWithToken(userCreated);
  }

  async signIn(user: LoginUserDto): Promise<UserWithToken> {
    const userExists = await this.userService.getUser({
      email: user.email,
    });

    if (!userExists) {
      throw new BadRequestException('User not found.');
    }
    const isPasswordValid = compareSync(user.password, userExists.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials.', {
        description: 'User or Password is invalid.',
      });
    }
    delete userExists.password;

    return this.getUserWithToken(userExists);
  }

  private getUserWithToken(user: UserEntity): UserWithToken {
    const token = this.jwtService.sign({ id: user.id });
    const userWithToken = { ...user, token };

    return userWithToken;
  }
}
