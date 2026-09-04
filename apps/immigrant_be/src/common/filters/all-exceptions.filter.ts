import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';
import * as Sentry from '@sentry/nestjs';
import { getCorrelationId } from '@app/config/request-context';

interface HealthCheckPayload {
  status: string;
  details: Record<string, unknown>;
}

/**
 * A failing health check throws a 503 whose body carries the per-service
 * diagnosis. Serialising it like any other error would collapse that into a
 * generic message and leave the caller knowing only that *something* is down.
 * The shape is checked strictly so no other 503 leaks its body by accident.
 */
function isHealthCheckPayload(value: unknown): value is HealthCheckPayload {
  return (
    typeof value === 'object' &&
    value !== null &&
    'status' in value &&
    'details' in value
  );
}

/**
 * Keys Nest itself puts in an exception body. Anything beyond them was put
 * there by the thrower, on purpose, for the caller to read.
 */
const NEST_ERROR_KEYS = new Set(['statusCode', 'message', 'error']);

/**
 * An error whose body says more than "it failed".
 *
 * Most errors here are a sentence to show somebody. A few are a question:
 * "you already have a copy of this — the one you made on Tuesday, and you have
 * edited it since" is what a confirmation dialog is built from, and collapsing
 * it to its first clause leaves the client guessing at what it is about to
 * destroy.
 *
 * The test is structural rather than a list of known shapes: a body carrying
 * anything beyond Nest's own three keys is one the thrower composed. Every
 * error thrown from a string — which is nearly all of them — is untouched, so
 * this widens no contract that already exists.
 */
function carriesDetail(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.keys(value).some((key) => !NEST_ERROR_KEYS.has(key))
  );
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (isHealthCheckPayload(exceptionResponse)) {
        this.logger.error(`HTTP ${status} - health check reported degraded`);
        response.status(status).json(exceptionResponse);
        return;
      }

      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : (exceptionResponse as any).message || exception.message;

      if (status < 500 && carriesDetail(exceptionResponse)) {
        this.logger.warn(`HTTP ${status} - ${JSON.stringify(message)}`);
        response.status(status).json({
          statusCode: status,
          ...exceptionResponse,
          message,
          timestamp: new Date().toISOString(),
        });
        return;
      }
    }

    if (status >= 500) {
      this.logger.error(
        `HTTP ${status} - ${message}`,
        exception instanceof Error ? exception.stack : undefined,
      );

      Sentry.withScope((scope) => {
        const correlationId = getCorrelationId();
        if (correlationId) {
          scope.setTag('correlation_id', correlationId);
        }
        Sentry.captureException(exception);
      });
    } else {
      this.logger.warn(`HTTP ${status} - ${JSON.stringify(message)}`);
    }

    response.status(status).json({
      statusCode: status,
      message,
      timestamp: new Date().toISOString(),
    });
  }
}
