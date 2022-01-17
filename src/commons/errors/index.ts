import { z } from 'zod';

import ValidatorError from './error.validator';

export interface ErrorResponse {
  issues?: z.ZodIssue[];
  errors?: { [k: string]: string[] };
  statusCode: number;
  message: string;
  stack?: string;
}
export { ValidatorError };
