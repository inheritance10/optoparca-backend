import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {CorsOptions} from "@nestjs/common/interfaces/external/cors-options.interface";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const corsOptions: CorsOptions = {
    origin: ['http://localhost:3000'], // Uzaktan gelen isteklerin izin verildiği alanlar
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // İzin verilen HTTP metodları
    credentials: true, // Kimlik doğrulama bilgilerinin paylaşılmasına izin ver (eğer uygundur)
  };

  app.enableCors(corsOptions); // Cors ayarlarını uygula
  await app.listen(8080);
}
bootstrap();
