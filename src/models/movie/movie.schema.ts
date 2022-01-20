import { Document, Model, model, Schema } from 'mongoose';

import { GenreSchema, IGenre } from '../genre';

export interface IMovie extends Document {
  title: string;
  numberInStock: number;
  dailyRentalRate: number;
  genre?: IGenre;
}
export type MovieDoc = IMovie & Document;
export type MovieModel = Model<IMovie>;

export const MovieSchema = new Schema<IMovie>({
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
});

export const Movie = model<MovieDoc, MovieModel>('Movie', MovieSchema);
