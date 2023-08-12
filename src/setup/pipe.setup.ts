import { INestApplication, ValidationPipe } from '@nestjs/common';

export const validationSetup = (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
};
