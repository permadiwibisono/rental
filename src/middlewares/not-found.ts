import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';

export const notFoundMiddleware = (_req: Request, _res: Response, next: NextFunction) =>
  next(createError(404, 'Resource not found'));
