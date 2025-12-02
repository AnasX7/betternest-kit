import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvService } from './config/env.service';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });
  const env = app.get(EnvService);
  app.enableCors({
    origin: env.get('CORS_ORIGIN'),
    credentials: true,
  });
  app.use(helmet());
  await app.listen(env.get('PORT') ?? 3000);
}

void bootstrap();
