import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = this.extractTokenFromHeader(req);

    try {
      const { sub } = this.jwtService.verify(token) as { sub: string };

      const user = await this.prisma.user.findUnique({
        where: { id: sub },
      });

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
