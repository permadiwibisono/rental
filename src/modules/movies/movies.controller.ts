import { NextFunction, Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';

import { ModelError } from '~/commons/errors';
import { Movie, validateMovie } from '~/models/movie';

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

export const findById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        error: {
          message: 'Bad Request',
          statusCode: 400,
        },
      });
    }

    const movie = await Movie.findById(id);
    if (!movie) return next(new ModelError('Movie'));
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

export const update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      body,
      params: { id },
    } = req;
    const validated = await validateMovie(body);

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        error: {
          message: 'Bad Request',
          statusCode: 400,
        },
      });
    }

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

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    if (!isValidObjectId(id)) {
      return res.status(400).json({
        error: {
          message: 'Bad Request',
          statusCode: 400,
        },
      });
    }

    const movie = await Movie.findById(id);
    if (!movie) {
      return next(new ModelError('Movie'));
    }
    await movie.delete();
    return res
      .json({
        message: 'Succeed',
        statusCode: 200,
      })
      .status(200);
  } catch (error) {
    return next(error);
  }
};
