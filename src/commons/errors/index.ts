import { z } from 'zod';

import ModelError from './error.model';
import UnauthorizedError from './error.unauthorized';
import ValidatorError from './error.validator';

export interface ErrorResponse {
  issues?: z.ZodIssue[];
  errors?: { [k: string]: string[] };
  statusCode: number;
  message: string;
  stack?: string;
}
export { ModelError, UnauthorizedError, ValidatorError };
