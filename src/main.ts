import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const logger = new Logger('Main (main.ts)');
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: [
        'http://localhost:8080',
        /^http:\/\/192\.168\.1\.([1-9]|[1-9]\d):8080$/,
      ],
    },
  });
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);

  const port = parseInt(configService.get('PORT'));
  await app.listen(3000);

  logger.log(`Server running on port ${port}`);
}

bootstrap();
