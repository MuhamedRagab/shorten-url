import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = this.extractTokenFromHeader(req);

    try {
      const payload = this.jwtService.verify(token) as { id: string };
      const user = await this.userService.getUser({ id: payload.id });

      if (!user) {
        throw new BadRequestException('User not found', {
          description: 'User not found',
        });
      }
    } catch (error) {
      throw new BadRequestException(error.message, {
        cause: error,
      });
    }

    next();
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    if (!token || type !== 'Bearer') {
      throw new UnauthorizedException('Authorization header is required', {
        description: 'Authorization header is required',
      });
    }

    return token;
  }
}
