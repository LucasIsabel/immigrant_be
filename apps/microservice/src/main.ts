// Must come first: Sentry has to be initialised before anything it instruments.
import './instrument';

import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';
import * as Sentry from '@sentry/nestjs';
import { MicroserviceModule } from './microservice.module';

async function bootstrap() {
  try {
    const app = await NestFactory.createApplicationContext(MicroserviceModule, {
      bufferLogs: true,
    });
    app.useLogger(app.get(Logger));
    app.enableShutdownHooks();

    process.on('SIGTERM', () => {
      void app.close().then(() => process.exit(0));
    });
  } catch (error) {
    /**
     * This used to exit silently, which made a worker that never came up look
     * exactly like a worker with nothing to do. The flush matters: the process
     * is about to die and Sentry sends over the network.
     */
    console.error('Microservice failed to start', error);
    Sentry.captureException(error);
    await Sentry.flush(2_000);
    process.exit(1);
  }
}
bootstrap();
