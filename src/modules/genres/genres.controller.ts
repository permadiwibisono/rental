import { NextFunction, Request, Response } from 'express';

import { Genre } from '~/models/genre/genre.schema';

export const index = async (_: Request, res: Response) => {
  const genres = await Genre.find({}).sort('name');
  res
    .json({
      data: genres,
      message: 'Succecced',
      statusCode: 200,
    })
    .status(200);
};

export const findById = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const genre = await Genre.findById(id);
  if (!genre) {
    return next();
  }
  return res
    .json({
      data: genre,
      message: 'Succecced',
      statusCode: 200,
    })
    .status(200);
};

export const create = async (req: Request, res: Response) => {
  const { body } = req;
  if (!body.name || body.name === '') {
    return res
      .json({
        error: {
          errors: {
            name: '`name` is required',
          },
          message: '422 Unprocessable Entity',
        },
      })
      .status(422);
  }
  const genre = await Genre.create({
    name: body.name,
  });
  return res
    .json({
      data: genre,
      message: 'Succecced',
      statusCode: 200,
    })
    .status(200);
};

export const update = async (req: Request, res: Response, next: NextFunction) => {
  const {
    params: { id },
    body,
  } = req;
  if (!body.name || body.name === '') {
    return res
      .json({
        error: {
          errors: {
            name: '`name` is required',
          },
          message: '422 Unprocessable Entity',
        },
      })
      .status(422);
  }
  const genre = await Genre.findById(id);
  if (!genre) return next();
  genre.name = body.name;
  await genre.save();
  return res
    .json({
      data: genre,
      message: 'Succecced',
      statusCode: 200,
    })
    .status(200);
};

export const destroy = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const genre = await Genre.findById(id);
  if (!genre) {
    return next();
  }
  await genre.delete();
  return res
    .json({
      message: 'Succecced',
      statusCode: 200,
    })
    .status(200);
};
