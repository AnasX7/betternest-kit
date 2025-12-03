import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './config/env.service';
import { Logger } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  const env = app.get(EnvService);
  const logger = new Logger(bootstrap.name);
  const PORT = env.get('PORT') ?? 3000;

  app.enableCors({
    origin: env.get('CORS_ORIGIN'),
    credentials: true,
  });

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'", "'unsafe-inline'", 'cdn.jsdelivr.net'],
          imgSrc: ["'self'", 'data:', 'cdn.jsdelivr.net'],
        },
      },
    }),
  );

  await app.listen(PORT, () => {
    logger.log(`Server is listening at port ${PORT}`);
    logger.log(`Current environment is: ${env.get('NODE_ENV')}`);
  });
}

void bootstrap();
