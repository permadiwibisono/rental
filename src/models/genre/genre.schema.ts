import { Document, Model, model, Schema } from 'mongoose';

export interface IGenre {
  name: string;
}
export interface GenreDoc extends IGenre, Document {}
export interface GenreModel extends Model<IGenre> {}

export const GenreSchema = new Schema<GenreDoc, GenreModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 50,
    },
  },
  { timestamps: true }
);

export const Genre = model<GenreDoc>('Genre', GenreSchema);
