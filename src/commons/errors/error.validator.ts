import { z } from 'zod';

interface FieldErrors {
  [k: string]: string[];
}

export default class ValidatorError extends z.ZodError {
  code: number;

  fieldErrors: FieldErrors;

  errorMessage: string;

  constructor(issues: z.ZodIssue[], msg?: string) {
    super(issues);
    this.code = 422;
    this.errorMessage = 'Unprocessable Entity';
    if (msg) {
      this.errorMessage = msg;
    }
    this.fieldErrors = this.flatten().fieldErrors;
  }
}
