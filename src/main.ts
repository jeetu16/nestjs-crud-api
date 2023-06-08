import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);
    await app.listen(4000);
    app.useGlobalPipes(new ValidationPipe());
  } catch (error) {
    console.log(error)
  }
}
bootstrap();
