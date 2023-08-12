import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { swaggerSetup } from './setup/swagger.setup';
import { validationSetup } from './setup/pipe.setup';
import { AppModule } from './app.module';

(async () => {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix('api/v1').enableCors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:5500'],
    credentials: true,
  });

  swaggerSetup(app);
  validationSetup(app);

  await app.listen(process.env.PORT, '0.0.0.0');
})();
