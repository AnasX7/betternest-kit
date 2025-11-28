import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './config/env.validation';

import { EnvModule } from './config/env.module';
import { PrismaModule } from './db/prisma.module';
// import { AuthModule } from '@thallesp/nestjs-better-auth';
import { LinksModule } from './links/links.module';

import { AppService } from './app.service';
import { AppController } from './app.controller';
// import { auth } from '@repo/auth';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
      validationOptions: {
        abortEarly: true,
      },
    }),
    // AuthModule.forRoot({ auth }),
    EnvModule,
    PrismaModule,
    LinksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
