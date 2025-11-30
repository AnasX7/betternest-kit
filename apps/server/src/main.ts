import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });
  app.enableCors();
  app.use(helmet());
  await app.listen(process.env.PORT ?? 3000);
}

void bootstrap();
