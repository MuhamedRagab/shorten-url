import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtConfig } from 'src/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from 'src/middleware/auth.middleware';
import { UrlController } from 'src/url/url.controller';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: jwtConfig,
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UrlController);
  }
}
