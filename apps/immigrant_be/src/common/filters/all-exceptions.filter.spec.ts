jest.mock('@sentry/nestjs', () => ({
  withScope: jest.fn((callback: (scope: unknown) => void) =>
    callback({ setTag: jest.fn(), setTags: jest.fn() }),
  ),
  captureException: jest.fn(),
}));

import {
  ArgumentsHost,
  BadRequestException,
  HttpException,
  HttpStatus,
  ServiceUnavailableException,
} from '@nestjs/common';
import * as Sentry from '@sentry/nestjs';
import { runWithCorrelationId } from '@app/config/request-context';
import { AllExceptionsFilter } from './all-exceptions.filter';

function buildHost() {
  const json = jest.fn();
  const status = jest.fn().mockReturnValue({ json });
  const host = {
    switchToHttp: () => ({ getResponse: () => ({ status }) }),
  } as unknown as ArgumentsHost;

  return { host, status, json };
}

describe('AllExceptionsFilter', () => {
  let filter: AllExceptionsFilter;

  beforeEach(() => {
    jest.clearAllMocks();
    filter = new AllExceptionsFilter();
    // The logger is noise here; the responses are what is under test.
    jest.spyOn(filter['logger'], 'error').mockImplementation(() => undefined);
    jest.spyOn(filter['logger'], 'warn').mockImplementation(() => undefined);
  });

  it('serialises an unknown error as a 500', () => {
    const { host, status, json } = buildHost();

    filter.catch(new Error('boom'), host);

    expect(status).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 500,
        message: 'Internal server error',
      }),
    );
  });

  it('reports server errors to Sentry', () => {
    const { host } = buildHost();
    const error = new Error('boom');

    filter.catch(error, host);

    expect(Sentry.captureException).toHaveBeenCalledWith(error);
  });

  /**
   * The tag is what makes a Sentry event joinable with the request log line
   * that produced it.
   */
  it('tags the Sentry event with the correlation ID of the request', () => {
    const { host } = buildHost();
    const setTag = jest.fn();
    (Sentry.withScope as jest.Mock).mockImplementation(
      (callback: (scope: unknown) => void) => callback({ setTag }),
    );

    runWithCorrelationId('req-42', () => filter.catch(new Error('boom'), host));

    expect(setTag).toHaveBeenCalledWith('correlation_id', 'req-42');
  });

  it('does not report client errors to Sentry', () => {
    const { host, status } = buildHost();

    filter.catch(new BadRequestException('invalid payload'), host);

    expect(status).toHaveBeenCalledWith(400);
    expect(Sentry.captureException).not.toHaveBeenCalled();
  });

  /**
   * Terminus reports a degraded system by throwing a 503 whose body names each
   * failing dependency. Flattening it would leave the caller with a bare 503.
   */
  it('passes a health check payload through untouched', () => {
    const { host, status, json } = buildHost();
    const payload = {
      status: 'error',
      info: { database: { status: 'up' } },
      error: { redis: { status: 'down' } },
      details: {
        database: { status: 'up' },
        redis: { status: 'down' },
      },
    };

    filter.catch(new ServiceUnavailableException(payload), host);

    expect(status).toHaveBeenCalledWith(503);
    expect(json).toHaveBeenCalledWith(payload);
  });

  it('does not report a degraded health check to Sentry', () => {
    const { host } = buildHost();

    filter.catch(
      new ServiceUnavailableException({
        status: 'error',
        error: { redis: { status: 'down' } },
        details: { redis: { status: 'down' } },
      }),
      host,
    );

    expect(Sentry.captureException).not.toHaveBeenCalled();
  });

  /**
   * The passthrough is keyed on the Terminus shape, so an unrelated 503 must
   * still be serialised like any other error instead of leaking its body.
   */
  it('still flattens a service-unavailable error that is not a health payload', () => {
    const { host, json } = buildHost();

    filter.catch(
      new ServiceUnavailableException('upstream provider is down'),
      host,
    );

    expect(json).toHaveBeenCalledWith(
      expect.objectContaining({
        statusCode: 503,
        message: 'upstream provider is down',
      }),
    );
  });

  it('keeps the status of an explicit HttpException', () => {
    const { host, status } = buildHost();

    filter.catch(new HttpException('teapot', 418), host);

    expect(status).toHaveBeenCalledWith(418);
  });
});
