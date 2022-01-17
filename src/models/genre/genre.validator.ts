import { z } from 'zod';

import { ValidatorError } from '~/commons/errors';

interface GenreInput {
  name: string;
}

const genreSchema = z.object({
  name: z.string().min(5).max(50),
});

export const validateGenre = async (input: GenreInput) => {
  try {
    const result = await genreSchema.parseAsync(input);
    return result;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new ValidatorError(error.issues);
    } else {
      throw error;
    }
  }
};
