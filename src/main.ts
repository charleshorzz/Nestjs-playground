import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // swagger configuration
  const config = new DocumentBuilder()
    .setTitle('NestJS API -- Charles Hor')
    .setDescription('Use the baseUrl at http://localhost:3000')
    .setVersion('1.0')
    .setTermsOfService('http://localhost:3000')
    .setLicense('MIT License', 'http://localhost:3000')
    .addServer('http://localhost:3000')
    .build();

  // Instantiate swagger document
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
