import { NextFunction, Request, Response } from 'express';

import { ModelError } from '~/commons/errors';
import { Movie } from '~/models/movie';
import { validateMovie } from '~/models/movie/movie.validator';

import * as svc from './movies.service';

export const index = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const movies = await Movie.find({}).sort('name');
    return res
      .json({
        data: movies,
        message: 'Succeed',
        statusCode: 200,
      })
      .status(200);
  } catch (error) {
    return next(error);
  }
};

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    const validated = await validateMovie(body);
    const genre = await svc.findGenreById(validated.genreId);
    if (!genre) return next(new ModelError('Genre'));
    const movie = await Movie.create({
      title: validated.title,
      genre,
      numberInStock: validated.numberInStock,
      dailyRentalRate: validated.dailyRentalRate,
    });
    return res
      .json({
        data: movie,
        message: 'Succeed',
        statusCode: 200,
      })
      .status(200);
  } catch (error) {
    return next(error);
  }
};
