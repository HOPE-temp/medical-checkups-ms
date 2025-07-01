//(global as any).crypto = require('crypto');
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Validaciones globales
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Serializador global
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  // Habilitar CORS para permitir peticiones desde el frontend
  app.enableCors();

  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle('HOPE - Chequeo Médico')
    .setDescription('Microservicio para gestión de chequeos médicos')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // Escuchar en el puerto del .env
  const PORT = process.env.PORT ?? 3005;
  await app.listen(PORT);
  console.log(` Microservicio levantado en http://localhost:${PORT}/docs`);
}
bootstrap();
