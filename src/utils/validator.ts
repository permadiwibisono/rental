import { z } from 'zod';

import { ValidatorError } from '~/commons/errors';

type Scheme = z.ZodTypeAny;

export async function validate<T>(input: unknown, schema: Scheme): Promise<T> {
  try {
    const result = await schema.parseAsync(input);
    return result;
  } catch (error) {
    throw new ValidatorError(error.issues);
  }
}
