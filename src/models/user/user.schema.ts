import { Document, Model, model, Schema } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password?: string;
  phone?: string;
  address?: string;
  isGold: boolean;
  isAdmin: boolean;
  isSuspended: boolean;
}
export interface UserDoc extends IUser, Document {
  generateToken(): string;
}
export interface UserModel extends Model<IUser> {}

export const UserSchema = new Schema<UserDoc, UserModel>(
  {
    name: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 100,
    },
    email: {
      type: String,
      required: true,
      minLength: 5,
      maxLength: 255,
      unique: true,
    },
    password: {
      type: String,
      minLength: 5,
      maxLength: 1024,
    },
    phone: {
      type: String,
      minLength: 5,
      maxLength: 80,
    },
    address: {
      type: String,
      minLength: 5,
      maxLength: 255,
    },
    isGold: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    isSuspended: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.methods.generateToken = function (this: UserDoc) {
  return '';
};

export const User = model<UserDoc, UserModel>('User', UserSchema);
