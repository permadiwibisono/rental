import { z } from 'zod';

import { validate } from '~/utils';

export function validateGenre(body: unknown) {
  const GenreSchema = z.object({
    name: z.string().min(5).max(50),
  });
  return validate<z.infer<typeof GenreSchema>>(body, GenreSchema);
}
