import { NextFunction, Request, Response } from 'express';

import { ErrorResponse, ValidatorError } from '~/commons/errors';
import { appConfig } from '~/config/app';
import logger from '~/utils/logger';

const httpErrorCode = [400, 401, 403, 422, 500, 502, 503];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorMiddleware = (err: any, _: Request, res: Response, next: NextFunction) => {
  logger.error(err);
  if (res.headersSent) {
    next(err);
  } else {
    const message = err.message || 'Internal server error';
    let code = 500;
    if (err.status) {
      code = err.status;
    } else if (httpErrorCode.includes(err.code)) {
      code = err.code;
    }
    let result: ErrorResponse = {
      message: appConfig.nodeEnv === 'production' && code === 500 ? 'Internal server error' : message,
      statusCode: err.status || code,
    };

    if (err instanceof ValidatorError) {
      result.issues = err.issues;
      result.errors = err.fieldErrors;
      result.message = err.errorMessage;
    } else if (err.errors) {
      result = {
        ...result,
        errors: err.errors,
      };
    }

    if (appConfig.nodeEnv === 'development') {
      result = {
        ...result,
        stack: err.stack,
      };
    }
    res.status(result.statusCode).json({ error: result });
  }
};
