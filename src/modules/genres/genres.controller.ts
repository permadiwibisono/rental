import { NextFunction, Request, Response } from 'express';

import { ModelError } from '~/commons/errors';
import { Genre, IGenre } from '~/models/genre';
import { StdResponse } from '~/types/response';

export const index = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const genres = await Genre.find({}).sort('name');
    const json: StdResponse<IGenre[]> = {
      data: genres,
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
    const genre = await Genre.findById(id);
    if (!genre) {
      return next(new ModelError('Genre', 404));
    }
    const json: StdResponse<IGenre> = {
      data: genre,
      message: 'Succeed',
      statusCode: 200,
    };
    return res.json(json).status(200);
  } catch (error) {
    return next(error);
  }
};
