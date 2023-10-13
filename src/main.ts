import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import {ValidationPipe} from "@nestjs/common";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
      .setTitle('Nestv2 API Doc')
      .setDescription('My Nestv2 API description')
      .setVersion('1.0')
      .addTag('Products')
      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('nestv2-api', app, document);

  await app.listen(3000);
}
bootstrap();
