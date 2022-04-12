import { Document, Model, model, Schema } from 'mongoose';

import { IModel } from '~/models';
import { GenreDoc, GenreDocDef, GenreModel, IGenre } from '~/models/genre';

export interface IMovie {
  title: string;
  numberInStock: number;
  dailyRentalRate: number;
  genre?: Partial<IModel> & IGenre;
}

export interface MovieDoc extends IMovie, Document {}
export interface MovieModel extends Model<MovieDoc> {}

const genreSchema = new Schema<GenreDoc, GenreModel>(GenreDocDef);

export const movieSchema = new Schema<MovieDoc, MovieModel>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    genre: genreSchema,
    numberInStock: {
      type: Number,
      default: 0,
      min: 0,
      max: 255,
    },
    dailyRentalRate: {
      type: Number,
      default: 0,
      min: 0,
      max: 255,
    },
  },
  { timestamps: true }
);

export const Movie = model<MovieDoc, MovieModel>('Movie', movieSchema);
