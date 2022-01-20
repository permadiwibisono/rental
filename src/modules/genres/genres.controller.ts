import { NextFunction, Request, Response } from 'express';

import { ModelError } from '~/commons/errors';
import { Genre, validateGenre } from '~/models/genre';

export const index = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const genres = await Genre.find({}).sort('name');
    return res
      .json({
        data: genres,
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
    const genre = await Genre.findById(id);
    if (!genre) {
      return next(new ModelError('Genre', 404));
    }
    return res
      .json({
        data: genre,
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
    const validated = await validateGenre(body);
    const genre = await Genre.create({
      name: validated.name,
    });
    return res
      .json({
        data: genre,
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
      params: { id },
      body,
    } = req;
    const validated = await validateGenre(body);
    const genre = await Genre.findById(id);
    if (!genre) return next(new ModelError('Genre'));
    genre.name = validated.name;
    await genre.save();
    return res
      .json({
        data: genre,
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
    const genre = await Genre.findById(id);
    if (!genre) {
      return next(new ModelError('Genre'));
    }
    await genre.delete();
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
