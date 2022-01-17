import { model, Schema } from 'mongoose';

interface IGenre {
  name: string;
}

const genreSchema = new Schema<IGenre>({
  name: { type: String, required: true, minlength: 5, maxlength: 50 },
});

export const Genre = model<IGenre>('Genre', genreSchema);
