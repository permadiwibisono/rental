import { NextFunction, Request, Response } from 'express';
import createError from 'http-errors';
import { isValidObjectId } from 'mongoose';

export const validateObjectID = (req: Request, _: Response, next: NextFunction) => {
  const { id } = req.params;
  if (!id || !isValidObjectId(id)) {
    next(createError(400, 'Invalid ID'));
    return;
  }
  next();
};
