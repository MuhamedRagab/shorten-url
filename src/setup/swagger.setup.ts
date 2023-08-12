import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerSetup = (app: INestApplication) => {
  const swaggerConfig = new DocumentBuilder()
    .addBearerAuth({
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      bearerFormat: 'JWT',
      description: 'JWT token',
      scheme: 'Bearer',
    })
    .setTitle('Users API')
    .setDescription('Users API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/v1/swagger', app, document);
};
