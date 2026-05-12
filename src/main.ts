import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // descarta campos no declarados en el DTO
      transform: true, // convierte string→number en @Query()
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
