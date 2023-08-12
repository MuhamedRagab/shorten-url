import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  async signUp(
    @Res({ passthrough: true }) response: Response,
    @Body() user: CreateUserDto,
  ) {
    try {
      const userCreated = await this.authService.signUp(user);
      response.cookie('token', userCreated.token, { httpOnly: true });

      return {
        status: HttpStatus.CREATED,
        message: 'User created succesfully.',
        data: userCreated,
      };
    } catch (error) {
      return {
        status: error.status,
        error: error.response,
      };
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Res({ passthrough: true }) response: Response,
    @Body() user: LoginUserDto,
  ) {
    try {
      const userLogged = await this.authService.signIn(user);
      response.cookie('token', userLogged.token, { httpOnly: true });

      return {
        status: HttpStatus.OK,
        message: 'User logged succesfully.',
        data: userLogged,
      };
    } catch (error) {
      return {
        status: error.status,
        error: error.response,
      };
    }
  }
}
