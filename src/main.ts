import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './Filters/http-exception.filter';
import { Request, Response, NextFunction } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.path.includes('/fotoPerfil')) {
      req.setTimeout(300000);
    }
    next();
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('API Proyecto Final')
    .setDescription('API del Proyecto Final de AWS')
    .setVersion('1.0')
    .addTag('proyecto-final')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
