import { NextFunction, Request, Response } from 'express';

import { ErrorResponse, ValidatorError } from '~/commons/errors';
import { appConfig } from '~/config/app';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const errorMiddleware = (err: any, _: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    next(err);
  } else {
    const message = err.message || 'Internal server error';
    let code = 500;
    if (err.code) {
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
