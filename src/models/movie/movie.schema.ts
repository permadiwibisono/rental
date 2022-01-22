import { Document, Model, model, Schema } from 'mongoose';

import { GenreSchema, IGenre } from '~/models/genre';

export interface IMovie {
  title: string;
  numberInStock: number;
  dailyRentalRate: number;
  genre: IGenre;
}
export interface MovieDoc extends IMovie, Document {}
export interface MovieModel extends Model<IMovie> {}

export const MovieSchema = new Schema<MovieDoc, MovieModel>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    genre: GenreSchema,
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

export const Movie = model<MovieDoc, MovieModel>('Movie', MovieSchema);
