import { isValidObjectId } from 'mongoose';
import { z } from 'zod';

import { validate } from '~/utils';

export function validateMovie(body: unknown) {
  const MovieSchema = z.object({
    title: z.string().min(5).max(255),
    genreId: z.string().refine((val) => val && isValidObjectId(val), { message: 'Invalid Genre ID' }),
    numberInStock: z.number(),
    dailyRentalRate: z.number(),
  });
  return validate<z.infer<typeof MovieSchema>>(body, MovieSchema);
}
