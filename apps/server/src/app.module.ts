import { Module } from '@nestjs/common';
import { APP_GUARD, REQUEST } from '@nestjs/core';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { validateEnv } from './config/env.validation';
import { EnvModule } from './config/env.module';
import { EnvService } from './config/env.service';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { onError, ORPCModule } from '@orpc/nest';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { PrismaModule } from './db/prisma.module';
import { Request } from 'express';
import { auth } from '@repo/auth';

declare module '@orpc/nest' {
  interface ORPCGlobalContext {
    request: Request;
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnv,
      validationOptions: {
        abortEarly: true,
      },
    }),
    EnvModule,
    AuthModule.forRoot({ auth }),
    ORPCModule.forRootAsync({
      useFactory: (request: Request) => ({
        interceptors: [
          onError((error) => {
            console.error(error);
          }),
        ],
        context: { request },
        eventIteratorKeepAliveInterval: 5000,
        customJsonSerializers: [],
        plugins: [],
      }),
      inject: [REQUEST],
    }),
    ThrottlerModule.forRootAsync({
      imports: [EnvModule],
      inject: [EnvService],
      useFactory: (env: EnvService) => [
        {
          ttl: Number(env.get('THROTTLE_TTL')),
          limit: Number(env.get('THROTTLE_LIMIT')),
        },
      ],
    }),
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
