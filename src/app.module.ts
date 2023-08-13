import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { configModule } from './config/configModule.config';
import { FakeModule } from './fake/fake.module';
import { throttlerConfig } from './config/throttler.config';
import { PrismaModule } from './prisma/prisma.module';
import { UrlsModule } from './url/url.module';

@Module({
  imports: [
    ThrottlerModule.forRoot(throttlerConfig),
    ConfigModule.forRoot(configModule),
    AuthModule,
    UrlsModule,
    PrismaModule,
    FakeModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
