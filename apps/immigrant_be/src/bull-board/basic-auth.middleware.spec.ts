/**
 * `@app/config/env` parses `process.env` at import time and would reject the
 * bare Jest environment. Stubbing it keeps the middleware under test real while
 * letting each case pick its own configuration.
 */
const mockEnv: {
  NODE_ENV: string;
  BULL_BOARD_USER?: string;
  BULL_BOARD_PASSWORD?: string;
} = { NODE_ENV: 'development' };

jest.mock('@app/config/env', () => ({
  get env() {
    return mockEnv;
  },
}));

import { NextFunction, Request, Response } from 'express';
import { bullBoardBasicAuth } from './basic-auth.middleware';

function buildResponse() {
  const res = {
    setHeader: jest.fn(),
    status: jest.fn(),
    send: jest.fn(),
  };
  res.status.mockReturnValue(res);
  return res as unknown as Response & typeof res;
}

function credentials(user: string, password: string): string {
  return `Basic ${Buffer.from(`${user}:${password}`).toString('base64')}`;
}

describe('bullBoardBasicAuth', () => {
  let next: NextFunction;

  beforeEach(() => {
    jest.clearAllMocks();
    next = jest.fn();
    mockEnv.NODE_ENV = 'development';
    mockEnv.BULL_BOARD_USER = undefined;
    mockEnv.BULL_BOARD_PASSWORD = undefined;
  });

  it('lets the board through unauthenticated in development', () => {
    const res = buildResponse();

    bullBoardBasicAuth({ headers: {} } as Request, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  /**
   * The failure mode that matters: forgetting to configure credentials must
   * close the board, never open it.
   */
  it('refuses access in production when no credentials are configured', () => {
    mockEnv.NODE_ENV = 'production';
    const res = buildResponse();

    bullBoardBasicAuth({ headers: {} } as Request, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('challenges a request that carries no credentials', () => {
    mockEnv.BULL_BOARD_USER = 'ops';
    mockEnv.BULL_BOARD_PASSWORD = 'secret';
    const res = buildResponse();

    bullBoardBasicAuth({ headers: {} } as Request, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.setHeader).toHaveBeenCalledWith(
      'WWW-Authenticate',
      'Basic realm="Bull Board"',
    );
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('rejects a wrong password', () => {
    mockEnv.BULL_BOARD_USER = 'ops';
    mockEnv.BULL_BOARD_PASSWORD = 'secret';
    const res = buildResponse();

    bullBoardBasicAuth(
      { headers: { authorization: credentials('ops', 'wrong') } } as Request,
      res,
      next,
    );

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('rejects a wrong user', () => {
    mockEnv.BULL_BOARD_USER = 'ops';
    mockEnv.BULL_BOARD_PASSWORD = 'secret';
    const res = buildResponse();

    bullBoardBasicAuth(
      { headers: { authorization: credentials('nope', 'secret') } } as Request,
      res,
      next,
    );

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('rejects a malformed authorization header', () => {
    mockEnv.BULL_BOARD_USER = 'ops';
    mockEnv.BULL_BOARD_PASSWORD = 'secret';
    const res = buildResponse();

    bullBoardBasicAuth(
      { headers: { authorization: 'Bearer some-token' } } as Request,
      res,
      next,
    );

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('accepts the configured credentials', () => {
    mockEnv.NODE_ENV = 'production';
    mockEnv.BULL_BOARD_USER = 'ops';
    mockEnv.BULL_BOARD_PASSWORD = 'secret';
    const res = buildResponse();

    bullBoardBasicAuth(
      { headers: { authorization: credentials('ops', 'secret') } } as Request,
      res,
      next,
    );

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  /**
   * A password that merely starts with the right characters must not pass —
   * this is what the constant-time comparison is there to prevent.
   */
  it('rejects a password that is only a prefix of the real one', () => {
    mockEnv.BULL_BOARD_USER = 'ops';
    mockEnv.BULL_BOARD_PASSWORD = 'secret';
    const res = buildResponse();

    bullBoardBasicAuth(
      { headers: { authorization: credentials('ops', 'sec') } } as Request,
      res,
      next,
    );

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('accepts a password containing a colon', () => {
    mockEnv.BULL_BOARD_USER = 'ops';
    mockEnv.BULL_BOARD_PASSWORD = 'a:b:c';
    const res = buildResponse();

    bullBoardBasicAuth(
      { headers: { authorization: credentials('ops', 'a:b:c') } } as Request,
      res,
      next,
    );

    expect(next).toHaveBeenCalled();
  });
});
