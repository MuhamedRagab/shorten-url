import { JwtService } from '@nestjs/jwt';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { randomUUID } from 'crypto';
import { UserWithToken } from './interface/auth-user.interface';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signUp(user: CreateUserDto): Promise<UserWithToken> {
    const userExist = await this.prisma.user.findUnique({
      where: { email: user.email },
    });
    if (userExist) {
      throw new BadRequestException('User not found.');
    }

    const hashedPassword = hashSync(user.password, genSaltSync());
    const userToCreate = {
      ...user,
      id: randomUUID(),
      password: hashedPassword,
    };

    const userCreated = await this.prisma.user.create({ data: userToCreate });
    delete userCreated.password;

    return this.getUserWithToken(userCreated);
  }

  async signIn(user: LoginUserDto): Promise<UserWithToken> {
    const userExists = await this.prisma.user.findUnique({
      where: { email: user.email },
    });

    if (!userExists) {
      throw new BadRequestException('User not found', {
        description: 'Email or Password is invalid.',
      });
    }

    const isPasswordValid = compareSync(user.password, userExists.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid credentials', {
        description: 'Email or Password is invalid.',
      });
    }
    delete userExists.password;

    return this.getUserWithToken(userExists);
  }

  private getUserWithToken(user: User): UserWithToken {
    const token = this.jwtService.sign({ id: user.id });
    const userWithToken = { ...user, token };

    return userWithToken;
  }
}
