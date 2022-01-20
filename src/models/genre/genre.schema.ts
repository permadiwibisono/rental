import { Document, Model, model, Schema } from 'mongoose';

export interface IGenre {
  name: string;
}

export type GenreDoc = IGenre & Document;
export type GenreModel = Model<IGenre>;

export const GenreSchema = new Schema<GenreDoc, GenreModel>({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 50,
  },
});

export const Genre = model<GenreDoc>('Genre', GenreSchema);
