import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SocketIOAdapter } from './socket-io-adapter';

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

  const configService = app.get(ConfigService);
  const port = parseInt(configService.get('PORT'));

  app.useGlobalPipes(new ValidationPipe());
  app.useWebSocketAdapter(new SocketIOAdapter(app, configService));
  await app.listen(3000);

  logger.log(`Server running on port ${port}`);
}

bootstrap();
