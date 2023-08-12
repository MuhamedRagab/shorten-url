import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { typeormModuleOptions } from './configs/typeorm.config';
import { UserModule } from './user/user.module';
import { configModule } from './configs/configModule.config';
import { FakeModule } from './fake/fake.module';
import { throttlerConfig } from './configs/throttler.config';

@Module({
  imports: [
    ThrottlerModule.forRoot(throttlerConfig),
    ConfigModule.forRoot(configModule),
    TypeOrmModule.forRootAsync({
      useFactory: typeormModuleOptions,
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    FakeModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
