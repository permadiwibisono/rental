import { Document, Model, model, Schema } from 'mongoose';

export interface IGenre {
  name: string;
}
export interface GenreDoc extends IGenre, Document {}
export interface GenreModel extends Model<GenreDoc> {}

export const GenreDocDef = {
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 50,
  },
};

export const genreSchema = new Schema<GenreDoc, GenreModel>(GenreDocDef, { timestamps: true });

export const Genre = model<GenreDoc>('Genre', genreSchema);
