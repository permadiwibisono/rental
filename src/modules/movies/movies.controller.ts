import { NextFunction, Request, Response } from 'express';

import { ModelError } from '~/commons/errors';
import { IMovie, Movie } from '~/models/movie';
import { StdResponse } from '~/types/response';

export const index = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const movies = await Movie.find({}).sort('name');
    const json: StdResponse<IMovie[]> = {
      data: movies,
      message: 'Succeed',
      statusCode: 200,
    };
    return res.json(json).status(200);
  } catch (error) {
    return next(error);
  }
};

export const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) return next(new ModelError('Movie'));
    const json: StdResponse<IMovie> = {
      data: movie,
      message: 'Succeed',
      statusCode: 200,
    };
    return res.json(json).status(200);
  } catch (error) {
    return next(error);
  }
};
