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
    const logger = app.get(Logger);
    app.useLogger(logger);
    app.enableShutdownHooks();

    process.on('SIGTERM', () => {
      void app.close().then(() => process.exit(0));
    });

    /**
     * A rejection nobody awaited must not end the worker.
     *
     * Every queue consumer here reports failures from `@OnWorkerEvent('failed')`,
     * which BullMQ calls without awaiting. A rejection inside one of those is an
     * unhandled rejection, and Node's default is to kill the process — which is
     * how a deleted ingestion row took the worker down in #344. The container
     * survives that, because `start.sh` runs the API in the foreground, so
     * nothing restarts the worker and ingestion stops in silence.
     *
     * Reported, not hidden: this is the net under the five consumers, not a
     * licence for any of them to throw.
     *
     * `uncaughtException` is deliberately **not** handled. It leaves the process
     * in an undefined state, where the honest response is to report and exit —
     * and staying alive would trade a dead worker for a lying one.
     */
    process.on('unhandledRejection', (reason) => {
      logger.error(
        `Unhandled rejection in the worker: ${
          reason instanceof Error ? reason.message : String(reason)
        }`,
        reason instanceof Error ? reason.stack : undefined,
      );
      Sentry.captureException(reason);
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
