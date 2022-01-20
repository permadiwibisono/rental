import { Genre } from '~/models/genre';

export const findGenreById = async (id: string) => {
  try {
    return await Genre.findById(id).select('_id name');
  } catch (error) {
    throw error;
  }
};
