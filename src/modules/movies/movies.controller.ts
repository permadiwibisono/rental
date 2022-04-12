import { NextFunction, Request, Response } from 'express';

import { ModelError } from '~/commons/errors';
import { IMovie, Movie, validateMovie } from '~/models/movie';
import { StdResponse } from '~/types/response';

import * as svc from './movies.service';

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

export const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req;
    const validated = await validateMovie(body);
    const genre = await svc.findGenreById(validated.genreId);
    if (!genre) return next(new ModelError('Genre'));
    const movie = await Movie.create({
      title: validated.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: validated.numberInStock,
      dailyRentalRate: validated.dailyRentalRate,
    });
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

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      body,
      params: { id },
    } = req;
    const validated = await validateMovie(body);

    let movie = await Movie.findById(id);
    if (!movie) return next(new ModelError('Movie'));

    const genre = await svc.findGenreById(validated.genreId);
    if (!genre) return next(new ModelError('Genre'));
    movie = await Movie.findByIdAndUpdate(
      id,
      {
        title: validated.title,
        genre: {
          _id: genre._id,
          name: genre.name,
        },
        numberInStock: validated.numberInStock,
        dailyRentalRate: validated.dailyRentalRate,
      },
      { new: true }
    );
    const json: StdResponse<IMovie> = {
      data: movie as IMovie,
      message: 'Succeed',
      statusCode: 200,
    };
    return res.json(json).status(200);
  } catch (error) {
    return next(error);
  }
};

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    if (!movie) {
      return next(new ModelError('Movie'));
    }
    await movie.delete();
    const json: StdResponse = {
      message: 'Succeed',
      statusCode: 200,
    };
    return res.json(json).status(200);
  } catch (error) {
    return next(error);
  }
};
