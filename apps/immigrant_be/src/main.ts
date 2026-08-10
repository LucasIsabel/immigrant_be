// Must come first: Sentry has to be initialised before anything it instruments.
import './instrument';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { env } from '@app/config/env';
import { CORRELATION_ID_HEADER } from '@app/config/request-context';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { correlationIdMiddleware } from './common/middleware/correlation-id.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
    // Holds startup logs until pino takes over, so they are not lost or plain.
    bufferLogs: true,
  });

  app.useLogger(app.get(Logger));

  // Before everything else, so every later layer runs inside the context.
  app.use(correlationIdMiddleware);

  app.setGlobalPrefix('api/v1');

  app.useGlobalFilters(new AllExceptionsFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Aloravia API')
    .setDescription(
      'The Aloravia API documentation. Protected endpoints require authentication via the session cookie **better-auth.session_token**. Use the "Authorize" button to send the cookie when testing.',
    )
    .setVersion('1.0')
    .addCookieAuth('better-auth.session_token')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/v1/docs', app, document);

  const corsOrigins =
    env.CORS_ORIGINS?.trim() === '*'
      ? true
      : env.CORS_ORIGINS.split(',')
          .map((o) => o.trim())
          .filter(Boolean);

  app.enableCors({
    origin: corsOrigins,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', CORRELATION_ID_HEADER],
    // Lets the browser read the ID back, so a user can quote it in a report.
    exposedHeaders: [CORRELATION_ID_HEADER],
    credentials: true,
  });

  await app.listen(env.PORT_IMMIGRANT || 3000);
}
bootstrap();
