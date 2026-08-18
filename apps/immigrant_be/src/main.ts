// Must come first: Sentry has to be initialised before anything it instruments.
import './instrument';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { env } from '@app/config/env';
import { CORRELATION_ID_HEADER } from '@app/config/request-context';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { correlationIdMiddleware } from './common/middleware/correlation-id.middleware';
import { buildSwaggerConfig } from './swagger.config';
import { writeFileSync } from 'node:fs';

/**
 * Escreve o documento OpenAPI num arquivo e encerra, sem subir servidor.
 *
 * Vive aqui, e não num script à parte, por dois motivos. O documento precisa sair
 * do mesmo pipeline que o servidor usa — o plugin do `@nestjs/swagger` é aplicado
 * pelo compilador do Nest CLI, então rodar por fora (tsx, esbuild) geraria um
 * contrato diferente do publicado e o diff não valeria nada. E `preview: true`
 * monta o grafo sem executar hooks de ciclo de vida, então o `onModuleInit` do
 * Prisma não abre conexão: dá para gerar o spec sem acesso ao banco.
 *
 *   pnpm build && OPENAPI_DUMP=/tmp/spec.json node dist/apps/immigrant_be/main
 */
async function dumpOpenApi(out: string): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    preview: true,
    logger: false,
  });

  const document = SwaggerModule.createDocument(app, buildSwaggerConfig());
  writeFileSync(out, `${JSON.stringify(document, null, 2)}\n`);
  await app.close();

  const schemas = Object.keys(document.components?.schemas ?? {}).length;
  process.stdout.write(
    `${out}: ${Object.keys(document.paths ?? {}).length} rotas, ${schemas} schemas\n`,
  );
}

async function bootstrap() {
  const dumpTarget = process.env.OPENAPI_DUMP;
  if (dumpTarget) {
    await dumpOpenApi(dumpTarget);
    return;
  }

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

  const document = SwaggerModule.createDocument(app, buildSwaggerConfig());

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
